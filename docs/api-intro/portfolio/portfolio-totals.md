---
sidebar_position: 2
sidebar_label: Portfolio Totals
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

export const tokenBalancesVars = {
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
};

# Portfolio Totals 

Surfaces various aggregations of onchain portfolio data.

---


### `totals`

The `totals` field from the `portfolio` query takes `addresses` input as an array, with optional `networks`. It returns fields such as `total`, `totalWithNFT`, `totalByAddress`, `totalByNetwork`, and other aggregations of portfolio data.

### Example Use Case: Net Worth

You want to show a user the USD value of their entire onchain holdings across tokens, NFTs, and apps — broken down by chain. Start by passing `address` into the `portfolio` and `totals` object. Then return `totalByNetworkWithNFT`, `network`, and `total`.

#### Example Variable

```js
{
  "addresses": ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"]
}
```

#### Example Query

```graphql
query($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    totals {
      totalByNetworkWithNFT {
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
      "totals": {
        "total": 11252.6887398181,
        "totalByNetworkWithNFT": [
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
          },
        }
      }
    }
}

```

<LinkButton href="./sandbox" type="primary" buttonCopy="Try in sandbox" />

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.       | `Address!` | 
| `networks`      | The network(s) to retreive balances on, input as an array.      | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 
| `withOverrides`      | Include user submitted NFT value overrides, default is off.       | `Boolean = false` | 

### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `appsTotal`      | Returns the total value of app holdings in USD      | `Float!`       |
| `claimables`      | Object that contains the fields `address`, `appId`, and `token`.    | `ClaimableToken!` | 
| `debts`      | Object that contains the fields `address`, `appId`, and `token`.       | `ClaimableToken!` | 
| `holdings`      | Returns the total value across categories such as tokens, NFTs, and apps in USD.      | `BaseTokenBalance!` | 
| `total`      | Returns the total value of an address in USD excluding NFTs.      | `Float!` | 
| `totalByAddress`      | Returns the total value excluding NFTs by address.        | `totalByAddress!` | 
| `totalByNetwork`      | Returns the total value excluding NFTs by network.       | `totalByNetwork!` |
| `totalByNetworkWithNFT`      | Returns the total value including NFTs by network.     | `totalByNetworkWithNFT!` | 
| `totalWithNFT`      | Returns the total value of an address in USD including NFTs.      | `Float!` | 
