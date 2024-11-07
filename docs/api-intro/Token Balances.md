---
sidebar_position: 2
---

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

Arguments for `tokenBalances`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Description goes here.       | `String!` | 
| `networks`      | Description goes here.       | `Network!` | 
| `appIds`      | Description goes here.       | `String!` | 
| `withOverrides`      | Description goes here.       | `Boolean = false` | 

Fields for `tokenBalances`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | Description goes here.       | `String!`       |
| `address`      | Description goes here.       | `String!` | 
| `network`      | Description goes here.       | `Network!` | 
| `token`      | Description goes here.       | `BaseTokenBalance!` | 
| `updatedAt`      | Description goes here.       | `Timestamp!` | 
| `balance`      | Description goes here.       | `Float!` | 
| `baseToken`      | Description goes here.       | `WalletTokenBalance!` | 
| `balanceUSD`      | Balance in USD ex: `2810.08`      | `Float!` | 
| `balanceRaw`      | Balance in units of the token address       | `String!` | 