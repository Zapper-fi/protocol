---
sidebar_position: 3
sidebar_label: Token Balances
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Token Balances

Surfaces any onchain token balances held by an address.

---


### `tokenBalances`

The `tokenBalances` field from the `portfolio` query takes `addresses` input as an array, with optional `networks`. It returns `address`, `network`, `balanceUSD`, `balance`, and other fields useful for token balance use cases.

### Example Use Case: Wallet Holdings

Let's say you are building a wallet and want users to be able to filter their tokens by chain. Start by passing `address` for the user and `network` for the selected chain. Then return the `tokenBalances` object, with fields such as `address`, `network`, `balanceUSD`, `balance`, `symbol`, and `updatedAt`.

#### Example Variables

```js
{
  "addresses": ["0x52c8ff44260056f896e20d8a43610dd88f05701b"],
  "networks": ["DEGEN_MAINNET"]
}
```

#### Example Query

```graphql
query Portfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses,
  networks: $networks) {
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

<SandboxButton/>

---


### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.       | `Address!` | 
| `networks`      | The network(s) to retreive balances on, input as an array.      | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 

### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | Unique identifier on the token object that is used to aggregate token balances across multiple addresses.       | `String!`       |
| `address`      | Address of the owner of the token.      | `Address!` | 
| `network`      | Returns the network the token is on.       | `Network!` | 
| `token`      | Object containing `balance`, `balanceRaw`, `balanceUSD`, and `baseToken`.       | `BaseTokenBalance!` | 
| `updatedAt`      | Time at which this token balance was calculated. This value should be used to determine if this cached balance is considered too "stale" for your purposes, and thus should be re-calculated via this endpoint.      | `Timestamp!` | 
| `balance`      | Balance in native units of the token adjusted for decimals.        | `Float!` | 
| `baseToken`      | Returns fields such as `address`, `symbol`, `price`, `imgUrl`, `name`,`network`,`decimals`,`verified`, and `id`.        | `WalletTokenBalance!` | 
| `balanceUSD`      | Balance in USD. ex: `2810.08`      | `Float!` | 
| `balanceRaw`      | Balance in native units of the token not adjusted for decimals.       | `String!` | 

