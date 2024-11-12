---
sidebar_position: 3
sidebar_label: Token Balances
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

# Token Balances

Surfaces any onchain token balances held by an address.

---


### `tokenBalances`

Returns all token balances with USD prics for an address on a set of networks.


### Common Uses

##### Wallet Holdings

Let's say you are building a wallet and want users to be able to filter their tokens by chain. You would pass `address` for the user and return the `tokenBalances` object, with fields such as `address`, `network`, `balanceUSD`, `balance`, and `symbol`. Example of the response below:


```json
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
        },
}
}
}
```


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
| `address`      | Required: Address you are querying balances for    | `String!` | 
| `networks`      | Networks for which to retrieve balances for, inputted an array.      | `Network!` | 
| `appIds`      | Filter by a specific app       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

</details>

<details>
<summary>Fields for tokenBalances</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | Unique identifier on the token object that is used to aggregate token balances across multiple addresses.       | `String!`       |
| `address`      | Address the position queried is for       | `String!` | 
| `network`      | -       | `Network!` | 
| `token`      | Object containing details about the token, such as metadata, price and balanc       | `BaseTokenBalance!` | 
| `updatedAt`      | Time at which this token balance was calculated. This value should be used to determine if this cached balance is considered too "stale" for your purposes, and thus should be re-calculated via this endpoint      | `Timestamp!` | 
| `balance`      |        | `Float!` | 
| `baseToken`      | -       | `WalletTokenBalance!` | 
| `balanceUSD`      | Balance in USD ex: `2810.08`      | `Float!` | 
| `balanceRaw`      | Balance in units of the token address       | `String!` | 

</details>