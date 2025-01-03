---
sidebar_position: 1
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

## Typical Usage

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

| Argument        | Description                                                 | Type          |
| --------------- | ----------------------------------------------------------- | ------------- |
| `addresses`     | The address(es) being queried, input as an array            | `[Address!]!` |
| `networks`      | Network(s) to retrieve balances from                        | `[Network!]`  |
| `appIds`        | Filter by specific app(s)                                   | `[String!]`   |
| `withOverrides` | Include user submitted NFT value overrides (default: false) | `Boolean`     |

## Portfolio Fields

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

Position balances come in two types that require GraphQL fragments to access their specific fields:

1. `AppTokenPositionBalance` (for fungible tokens like LP tokens):
   - `balance`: Token balance
   - `balanceUSD`: USD value
   - `price`: Token price
   - `symbol`: Token symbol
   - `supply`: Total supply
   - `pricePerShare`: Underlying token ratios

2. `ContractPositionBalance` (for positions like lending):
   - `balanceUSD`: Position USD value
   - `tokens`: Array of underlying tokens and their metadata
   - `displayProps`: Formatted data for UI rendering


:::note
Smart accounts like Maker's `DSProxy` are automatically included in balance responses as part of an "implicit" bundle.
:::

#### Example App Balance Query

```graphql
query Portfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    appBalances {
      appName
      appId
      network
      products {
        label
        assets {
          # App token positions (e.g. LP tokens)
          ... on AppTokenPositionBalance {
            balance
            balanceUSD
            price
            symbol
            supply
            displayProps {
              label
              images
            }
          }
          # Contract positions (e.g. lending positions)
          ... on ContractPositionBalance {
            balanceUSD
            tokens {
              metaType
              token {
                balance
                symbol
                price
              }
            }
            displayProps {
              label
              images
            }
          }
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
          "appName": "Lido",
          "appId": "lido",
          "network": "ETHEREUM_MAINNET",
          "products": [
            {
              "label": "stETH",
              "assets": [
                {
                  "type": "app-token",
                  "balance": "0.011535336210992167",
                  "balanceUSD": 38.57116510214294,
                  "price": 3343.74,
                  "symbol": "stETH",
                  "supply": 9685583.98598499,
                  "displayProps": {
                    "label": "stETH",
                    "images": [
                      "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png"
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          "appName": "GMX",
          "appId": "gmx",
          "network": "ARBITRUM_MAINNET",
          "products": [
            {
              "label": "Farms",
              "assets": [
                {
                  "type": "contract-position",
                  "balanceUSD": 217.5294876331168,
                  "tokens": [
                    {
                      "metaType": "SUPPLIED",
                      "token": {
                        "balance": "123.19277851320523",
                        "symbol": "GLP",
                        "price": 1.4899571509867806
                      }
                    },
                    {
                      "metaType": "CLAIMABLE",
                      "token": {
                        "balance": "0.010176781691672002",
                        "symbol": "WETH",
                        "price": 3338.73
                      }
                    },
                    {
                      "metaType": "CLAIMABLE",
                      "token": {
                        "balance": "0",
                        "symbol": "esGMX",
                        "price": 28.09
                      }
                    }
                  ],
                  "displayProps": {
                    "label": "GLP",
                    "images": [
                      "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f.png",
                      "https://storage.googleapis.com/zapper-fi-assets/tokens/arbitrum/0x82af49447d8a07e3bd95bd0d56f35241523fbab1.png"
                    ]
                  }
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
query ($addresses: [Address!]!, $networks: [Network!]) {
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
query ($addresses: [Address!]!) {
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
## Balance Computation

For any addresses that have never been tracked by Zapper before, balances need to be computed asynchronously before being fetched to ensure the most up-to-date portfolio data. The following mutations and query are designed for this purpose.

### computeTokenBalances

Initiates a job to compute token balances for a wallet.

The input type for both mutations is `PortfolioInput`:

```graphql
input PortfolioInput {
  """The wallet addresses for which to fetch balances"""
  addresses: [Address!]!
  """The networks for which to fetch balances"""
  networks: [Network!]
  """The app slugs for which to fetch balances"""
  appIds: [String!]
  flagAsStale: Boolean
}
```

#### Example Variables

```js
{
  "input": {
    "addresses": ["Habp5bncMSsBC3vkChyebepym5dcTNRYeg2LVG464E96"],
    "networks": ["BITCOIN_MAINNET", "SOLANA_MAINNET"]
  }
}
```

#### Example Mutation

```graphql
mutation ComputeTokenBalances($input: PortfolioInput!) {
  computeTokenBalances(input: $input) {
    jobId
  }
}
```

#### Example Response

```js
{
  "data": {
    "computeTokenBalances": {
      "jobId": "38b53084-9e84-46fd-a5fc-e7463baba936"
    }
  }
}
```

### computeAppBalances

Initiates a job to compute app balances for a wallet.

#### Example Variables

```js
{
  "input": {
    "addresses": [
      "0x123...", // EVM address being tracked for first time
      "Habp5bncMSsBC3vkChyebepym5dcTNRYeg2LVG464E96" // Solana address
    ],
    "networks": ["ETHEREUM_MAINNET", "SOLANA_MAINNET"]
  }
}
```

#### Example Mutation

```graphql
mutation ComputeAppBalances($input: PortfolioInput!) {
  computeAppBalances(input: $input) {
    jobId
  }
}
```

#### Example Response

```js
{
  "data": {
    "computeAppBalances": {
      "jobId": "176d50a0-c42b-49b1-a263-c1c4a63d8a3c"
    }
  }
}
```

### balanceJobStatus

Query the status of a balance computation job.

#### Example Variables

```js
{
  "jobId": "176d50a0-c42b-49b1-a263-c1c4a63d8a3c"
}
```

#### Example Query

```graphql
query BalanceJobStatus($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
    jobId
    status
  }
}
```

#### Example Response

```js
{
  "data": {
    "balanceJobStatus": {
      "jobId": "176d50a0-c42b-49b1-a263-c1c4a63d8a3c",
      "status": "completed"
    }
  }
}
```

#### Response Fields

| Field      | Description                                                             | Type      |
|------------|-------------------------------------------------------------------------|-----------|
| `jobId`    | Unique identifier for the computation job                               | `ID!`     |
| `status`   | Current status of the job               | `String!` |

## Best Practices

1. Always specify required fields to minimize response size
2. Use network filters when you only need specific chains
3. Consider caching responses based on the `updatedAt` timestamp
4. Handle NFT valuations appropriately based on your use case

Remember that the portfolio query is highly flexible - you can request as much or as little data as needed for your specific use case.
