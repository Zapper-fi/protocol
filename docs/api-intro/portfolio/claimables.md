---
sidebar_position: 1
sidebar_label: Claimables
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

export const tokenBalancesVars = {
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
};

# Claimables

Surfaces all available claimable tokens for a given address across all indexed onchain apps.

---


### `claimables`

The `claimables` query takes `addresses` inputted an array, with optional `networks` and returns fields such as `address`, `appId`, and the `token` object which contains useful information about a claimable token such as `address`, `balance`, `balanceUSD`, and `price`.

### Example Use Case: Claimables

Let's say you want to show a user the tokens they can claim across all the onchain apps they have used. You want to surface this in USD and include the name of the App. You would pass `address` for the user and return the `claimables` object, with fields such as `address`, `appId`, `balanceUSD`, `balance`, `symbol`, `price`, and `network`.

#### Example Query

```graphql
query Claimables($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    totals {
      claimables {
        address
        appId
        token {
          address
          balance
          balanceUSD
          network
          price
          symbol
        }
      }
    }
  }
```

### Example Variables

```json
{
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
}
```

#### Example Response

```json
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
          },
          },
}
}
}
```

<LinkButton href="./sandbox" type="primary" buttonCopy="Try in sandbox" />

---

### Reference

<details>
<summary>Arguments for claimables</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | Required: Address you are querying balances for, inputted an array.       | `String!` | 
| `networks`      | Networks for which to retrieve balances for, inputted an array.      | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 

</details>

<details>
<summary>Fields for claimables</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Address of the claimable token.      | `String!`       |
| `appID`      | The app that the token is claimable in.     | `String!`       |
| `token`      | An object containing fields pertaining to the token including `address`, `balance`, `balanceUSD`, and `price`.     | `AbstractToken!`       |


</details>