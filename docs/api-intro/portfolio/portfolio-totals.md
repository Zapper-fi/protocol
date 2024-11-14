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

The `totals` object contains takes an `address` with optional `networks` and returns fields such as `total`, `totalWithNFT`, `totalByAddress`, `totalByNetwork`, and other aggregations of portfolio data.

### Example Use Case: Net Worth

You want to show a user the USD value of their entire onchain holdings across tokens, NFTs, and apps. You also want to break it down by chain. You would pass `address` into the `portfolio` and `totals` object, and return `totalByNetworkWithNFT`, `network`, and `total`.

#### Example Variables

```json
{
  "addresses": [
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    "0x6f6e75fb472ee39d847d825cc7c9a613e227e261"
  ]
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

```json
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

### Reference

<details>
<summary>Arguments for totals</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.       | `String!` | 
| `networks`      | The network(s) to retreive balances on, input as an array.      | `Network!` | 
| `appIds`      | Filter by a specific app       | `String!` | 
| `withOverrides`      | Include user submitted NFT value overrides, default off.       | `Boolean = false` | 

</details>

<details>
<summary>Fields for totals</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `appsTotal`      | Returns total USD value of app holdings       | `Float!`       |
| `claimables`      | Object with fields `address`, `appId`, and `token` for returning claimables.      | `ClaimableToken!` | 
| `debts`      | Object with fields `address`, `appId`, and `token` for returning debts.       | `ClaimableToken!` | 
| `holdings`      | Returns USD total across categories such as Tokens, NFTs, and apps.       | `BaseTokenBalance!` | 
| `total`      | Returns a single USD total value.      | `Float!` | 
| `totalByAddress`      | Returns USD totals by address.        | `totalByAddress!` | 
| `totalByNetwork`      | Returns USD totals by network.       | `totalByNetwork!` | 
| `totalByNetworkWithNFT`      | Returns USD totals by network including NFTs.     | `totalByNetworkWithNFT!` | 
| `totalWithNFT`      | Returns a single USD total value including NFTs.      | `Float!` | 

</details>