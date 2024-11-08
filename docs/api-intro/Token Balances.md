---
sidebar_position: 3
---

import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';

export const tokenBalancesQuery = `query Portfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
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
}`;

export const tokenBalancesVars = {
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
};

Surfaces any onchain token balances held by an address.

---

### `tokenBalances`

Returns all token balances for an address on a set of networks.


### Sandbox

<ApolloSandboxComponent 
  query={tokenBalancesQuery}
  variables={tokenBalancesVars}
/>

### Reference

<details>
<summary>Arguments for tokenBalances</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | -       | `String!` | 
| `networks`      | -       | `Network!` | 
| `appIds`      | -       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

</details>

<details>
<summary>Fields for tokenBalances</summary>

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

</details>