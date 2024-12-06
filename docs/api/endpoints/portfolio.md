---
sidebar_position: 2
sidebar_label: Portfolio Data
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';


# Portfolio

Access complete onchain portfolio data with a single query. The portfolio query provides comprehensive access to balances across tokens, apps, and NFTs, along with detailed portfolio totals and breakdowns.

## Overview

The `portfolio` query takes an array of `addresses` as input, with optional parameters for `networks`, `appIds`, and `withOverrides`. It returns a complete view of onchain holdings including:
- Token balances
- App positions 
- NFT holdings
- Portfolio totals and breakdowns
- Claimables and debts

## Basic Usage

### Example Variables
```js
{
  "addresses": ["0x6c52512cbaf8794b6ca55dfa71fd8cfc447ad8c7"]
}
```

### Example Query
```graphql
query GetCompletePortfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    appBalances {
      appName
      balanceUSD
      appId
    }
    tokenBalances {
      address
      token {
        balanceUSD
        baseToken {
          symbol
          network
          imgUrl
        }
      }
    }
    nftBalances {
      network
      balanceUSD
    }
    totals {
      total
      totalWithNFT
      totalByNetwork {
        network
        total
      }
    }
  }
}
```

### Example Response
```js
{
  "data": {
    "portfolio": {
      "appBalances": [
        {
          "appName": "Quickswap",
          "balanceUSD": 9.603105154847416,
          "appId": "quickswap"
        }
      ],
      "tokenBalances": [
        {
          "address": "0x6c52512cbaf8794b6ca55dfa71fd8cfc447ad8c7",
          "token": {
            "balanceUSD": 2653.6225420023493,
            "baseToken": {
              "symbol": "ETH",
              "network": "ETHEREUM_MAINNET",
              "imgUrl": "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png"
            }
          }
        }
      ],
      "nftBalances": [
        {
          "network": "ETHEREUM_MAINNET",
          "balanceUSD": 9700.66539951
        }
      ],
      "totals": {
        "total": 2711.6429083437106,
        "totalWithNFT": 12412.308307853711,
        "totalByNetwork": [
          {
            "network": "ETHEREUM_MAINNET",
            "total": 2663.6074520023494
          },
          {
            "network": "BASE_MAINNET",
            "total": 48.0354563413612
          }
        ]
      }
    }
  }
}
```

### Query Arguments

| Argument | Description | Type |
|----------|-------------|------|
| `addresses` | The address(es) being queried, input as an array | `[Address!]!` |
| `networks` | Network(s) to retrieve balances from | `[Network!]` |
| `appIds` | Filter by specific app(s) | `[String!]` |
| `withOverrides` | Include user submitted NFT value overrides (default: false) | `Boolean` |

## Portfolio Components

### 1. Token Balances (`tokenBalances`)

Access native token holdings across different networks.

#### Key Fields
- `key`: Unique identifier for aggregating token balances across addresses
- `address`: Owner's address
- `network`: Token's network
- `token`: Contains balance details:
  - `balance`: Native token units (adjusted for decimals)
  - `balanceUSD`: USD value
  - `baseToken`: Token metadata (symbol, name, image, etc.)
- `updatedAt`: Last calculation timestamp

#### Example Token Balance Query
```graphql
query Portfolio($addresses: [Address!]!, $networks: [Network!]) {
  portfolio(addresses: $addresses, networks: $networks) {
    tokenBalances {
      address
      network
      token {
        balanceUSD
        balance
        baseToken {
          symbol
        }
      }
      updatedAt
    }
  }
}
```

#### Example Response
```js
{
  "data": {
    "portfolio": {
      "tokenBalances": [
        {
          "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b",
          "network": "DEGEN_MAINNET",
          "token": {
            "balanceUSD": 10.320882111461026,
            "balance": 530.9972537369096,
            "baseToken": {
              "symbol": "DEGEN"
            }
          },
          "updatedAt": 1731379366504
        },
        {
          "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b",
          "network": "DEGEN_MAINNET",
          "token": {
            "balanceUSD": 4.76944166703876,
            "balance": 6555103.710150876,
            "baseToken": {
              "symbol": "THINGS"
            }
          },
          "updatedAt": 1731379366504
        }
      ]
    }
  }
}
```

### 2. App Balances (`appBalances`)

View positions within onchain applications like lending protocols, DEXes, etc.

#### Key Fields
- `address`: Position owner's address
- `appId`: Application identifier
- `appName`: Display name
- `balanceUSD`: Total position value in USD
- `network`: Network where position exists
- `products`: Detailed breakdown of positions by product type
- `appImage`: Application logo URL

:::note
Smart accounts like Maker's `DSProxy` are automatically included in balance responses as part of an "implicit" bundle.
:::

#### Example App Balance Query
```graphql
query Portfolio($addresses: [Address!]!, $networks: [Network!]) {
  portfolio(addresses: $addresses, networks: $networks) {
    appBalances {
      address
      appName
      balanceUSD
      network
      products {
        label
        assets {
          address
        }
      }
    }
  }
}
```

#### Example Response
```js
{
  "data": {
    "portfolio": {
      "appBalances": [
        {
          "address": "0xe321bd63cde8ea046b382f82964575f2a5586474",
          "appName": "Aave V3",
          "balanceUSD": 46.05200420761579,
          "network": "OPTIMISM_MAINNET",
          "products": [
            {
              "label": "Lending",
              "assets": [
                {
                  "address": "0x513c7e3a9c69ca3e22550ef58ac1c0088e918fff"
                },
                {
                  "address": "0x625e7708f30ca75bfd92586e17077590c60eb4cd"
                },
                {
                  "address": "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8"
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

### 3. NFT Balances (`nftBalances`)

Access NFT holdings and their estimated values.

#### Key Fields
- `network`: NFT's network
- `balanceUSD`: Estimated total value in USD

:::note
NFT valuations use Zapper's algorithm but can be overridden with top offer, last sale, or custom values. NFTs can be hidden by owners to remove them from portfolio views.
:::

#### Example NFT Balance Query
```graphql
query($addresses: [Address!]!, $networks: [Network!]) {
  portfolio(addresses: $addresses, networks: $networks) {
    nftBalances {
      balanceUSD
      network
    }
  }
}
```

#### Example Response
```js
{
  "data": {
    "portfolio": {
      "nftBalances": [
        {
          "balanceUSD": 1662.061734333,
          "network": "BASE_MAINNET"
        }
      ]
    }
  }
}
```

### 4. Portfolio Totals (`totals`)

Get aggregated portfolio values and breakdowns.

#### Key Fields
- `total`: Total portfolio value (excluding NFTs)
- `totalWithNFT`: Total portfolio value (including NFTs)
- `appsTotal`: Total value in app positions
- `totalByNetwork`: Breakdown by network
- `totalByNetworkWithNFT`: Network breakdown including NFTs
- `claimables`: Claimable token positions
- `debts`: Outstanding debt positions
- `holdings`: Portfolio breakdown by category

#### Example Totals Query
```graphql
query($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    totals {
      total
      totalWithNFT
      totalByNetwork {
        network
        total
      }
      holdings {
        label
        balanceUSD
        pct
      }
    }
  }
}
```

#### Example Response
```js
{
  "data": {
    "portfolio": {
      "totals": {
        "total": 11252.6887398181,
        "totalByNetwork": [
          {
            "network": "ETHEREUM_MAINNET",
            "total": 2936.7837588270454
          },
          {
            "network": "ARBITRUM_MAINNET",
            "total": 2540.454378130174
          },
          {
            "network": "AVALANCHE_MAINNET",
            "total": 173.0888443081786
          },
          {
            "network": "BASE_MAINNET",
            "total": 104.79617114576013
          }
        ]
      }
    }
  }
}
```

### 5. Claimables

View all available claimable tokens across indexed onchain apps.

#### Key Fields
- `address`: Address of the claimable token
- `appId`: App where the token is claimable
- `token`: Token details including balance, value, and metadata

#### Example Claimables Query
```graphql
query Claimables($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    totals {
      claimables {
        appId
        address
        token {
          address
          balanceUSD
          balance
          symbol
          price
          network
        }
      }
    }
  }
}
```

#### Example Response
```js
{
  "data": {
    "portfolio": {
      "totals": {
        "claimables": [
          {
            "address": "0xe321bd63cde8ea046b382f82964575f2a5586474",
            "appId": "uniswap-v3",
            "token": {
              "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              "balanceUSD": 3.987004980732349,
              "balance": "0.001211064192315766",
              "symbol": "WETH",
              "price": 3292.15,
              "network": "ETHEREUM_MAINNET"
            }
          }
        ]
      }
    }
  }
}
```

## Complete Response Structure

The portfolio query returns a nested structure that can include:

```typescript
{
  portfolio: {
    // Token holdings
    tokenBalances: [{
      address: string
      network: Network
      token: {
        balanceUSD: number
        balance: number
        baseToken: {
          symbol: string
          network: Network
          imgUrl: string
        }
      }
    }]
    
    // App positions
    appBalances: [{
      appName: string
      balanceUSD: number
      appId: string
      network: Network
      products: [{
        label: string
        assets: [{ address: string }]
      }]
    }]
    
    // NFT holdings
    nftBalances: [{
      network: Network
      balanceUSD: number
    }]
    
    // Portfolio totals
    totals: {
      total: number
      totalWithNFT: number
      totalByNetwork: [{
        network: Network
        total: number
      }]
      holdings: [{
        label: string
        balanceUSD: number
        pct: number
      }]
      claimables: [{
        address: string
        appId: string
        token: {
          address: string
          balanceUSD: number
          balance: string
          symbol: string
          price: number
          network: Network
        }
      }]
    }
  }
}
```

## Best Practices

1. Always specify required fields to minimize response size
2. Use network filters when you only need specific chains
3. Consider caching responses based on the `updatedAt` timestamp
4. Handle NFT valuations appropriately based on your use case
5. Account for potential stale data in cached responses

Remember that the portfolio query is highly flexible - you can request as much or as little data as needed for your specific use case.