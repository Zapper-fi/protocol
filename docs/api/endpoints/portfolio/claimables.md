---
sidebar_position: 1
sidebar_label: Claimables
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

export const tokenBalancesVars = {
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
};

# Claimables

Surfaces all available claimable tokens for a given address across all indexed onchain apps.

---


### `claimables`

The `claimables` field from the `portfolio` query takes `addresses` input as an array, with optional `networks`. It returns fields such as `address`, `appId`, and the `token` object which contains useful information about a claimable token.

### Example Use Case: Claimables

Let's say you want to show a user the tokens they can claim in USD on all onchain apps. Start by passing `addresses` for the user. Then return the `claimables` object, with fields such as `address`, `appId`, `balanceUSD`, `balance`, `symbol`, `price`, and `network`.


#### Example Variable

```js
{
  "addresses": ["0xe321bd63cde8ea046b382f82964575f2a5586474"]
}
```

#### Example Query

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
          },
          },
      }
  }
}
```

<SandboxButton />

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.      | `Address!` | 
| `networks`      | The network(s) to retreive balances on, input as an array.      | `Network!` | 
| `appIds`      | Query by a specific app.       | `String!` | 

### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Address of the claimable token.      | `Address!`       |
| `appID`      | The app that the token is claimable in.     | `String!`       |
| `token`      | An object containing fields pertaining to the token including `address`, `balance`, `balanceUSD`, `symbol`, `network`, `price`, `decimals`, and `type`.     | `AbstractToken!`       |
