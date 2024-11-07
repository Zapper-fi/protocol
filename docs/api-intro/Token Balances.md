---
sidebar_position: 3
---

import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';


Surfaces any onchain token balances held by an address.

---

### `tokenBalances`

Returns all token balances for an address on a set of networks.

```sh
query($addresses: [Address!]!) {
    portfolio(addresses: $addresses) {
      tokenBalances {
      }
    }
```

<ApolloSandboxComponent />


Arguments for `tokenBalances`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | -       | `String!` | 
| `networks`      | -       | `Network!` | 
| `appIds`      | -       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

Fields for `tokenBalances`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | -       | `String!`       |
| `address`      | -       | `String!` | 
| `network`      | -       | `Network!` | 
| `token`      | -       | `BaseTokenBalance!` | 
| `updatedAt`      | -       | `Timestamp!` | 
| `balance`      | -       | `Float!` | 
| `baseToken`      | -       | `WalletTokenBalance!` | 
| `balanceUSD`      | Balance in USD ex: `2810.08`      | `Float!` | 
| `balanceRaw`      | Balance in units of the token address       | `String!` | 