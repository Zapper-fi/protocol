---
sidebar_position: 1
sidebar_label: Complete Portfolio
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Complete Portfolio

Fetch an entire onchain portfolio in a single query.
---


### `portfolio`

The `portfolio` query takes `addresses` input as an array, with optional `networks`. It has the fields [`appBalances`](/docs/api/endpoints/portfolio/app-balances), [`nftBalances`](/docs/api/endpoints/portfolio/nft-balances), [`tokenBalances`](/docs/api/endpoints/portfolio/token-balances, [`claimables`](/docs/api/endpoints/portfolio/claimables), and [`totals`](/docs/api/endpoints/portfolio/portfolio-totals). You can query as many of these fields in a single query or call them seperately.

### Example Use Case: Net Worth

You want to show surface the entire onchain portfolio for a user. Start by passing `address` into `portfolio`. Then return `totalByNetwork`, `network`, and `total`.

#### Example Variable

```js
{
  "addresses": ["0x6c52512cbaf8794b6ca55dfa71fd8cfc447ad8c7"]
}
```

#### Example Query

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

#### Example Response

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

<SandboxButton/>

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.       | `Address!` | 
| `networks`      | The network(s) to retreive balances on, input as an array.      | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 
| `withOverrides`      | Include user submitted NFT value overrides, default is off.       | `Boolean = false` | 

### Fields

| Field | Description | Type |
|-------|-------------|------|
| `tokenBalances` | List of token balance details including address, network, and base token information | `[TokenBalance!]!` |
| `appBalances` | List of app-specific balances with app name, network, and USD value | `[AppBalance!]!` |
| `nftBalances` | List of NFT balances by network with USD valuations | `[NftBalance!]!` |
| `totals.total` | Total portfolio value excluding NFTs in USD | `Float!` |
| `totals.appsTotal` | Total value of app positions in USD | `Float!` |
| `totals.totalWithNFT` | Total portfolio value including NFTs in USD | `Float!` |
| `totals.claimables` | List of tokens that can be claimed, including app ID and token details | `[ClaimableToken!]!` |
| `totals.debts` | List of outstanding debt positions | `[ClaimableToken!]!` |
| `totals.holdings` | Breakdown of portfolio holdings by category with labels and percentages | `[PortfolioHolding!]!` |
| `totals.totalByAddress` | Portfolio value breakdown by wallet address | `[TotalByAddress!]!` |
| `totals.totalByNetwork` | Portfolio value breakdown by network (excluding NFTs) | `[TotalByNetwork!]!` |
| `totals.totalByNetworkWithNFT` | Portfolio value breakdown by network (including NFTs) | `[TotalByNetwork!]!` |
| `proxies` | List of proxy/delegate accounts associated with the portfolio | `[ProxyAccount!]!` |
