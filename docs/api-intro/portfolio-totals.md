---
sidebar_position: 3
sidebar_label: Portfolio Totals
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

# Portfolio Totals

Surfaces various aggregations of onchain portfolio data including total net worth, claimables, debts, and more.

---


### `totals`

The `totals` query takes an `address` with optional `networks` and returns fields such as `claimables`, `debts`, `holdings`, and other aggregations of portfolio data.

### Use Cases

##### Claimables

Let's say you want to show a user all the tokens they can claim across all the onchain apps they have used and how much it's worth in USD. You would pass `address` for the user and return the `portfolio` object, with fields such as `token`, `address`, `balanceUSD`, `symbol`, and `price`. Example of the response below:

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

##### Net Worth

You want to show a user the USD value of their entire onchain holdings across tokens, NFTs, and apps. You also want to break it down by chain. You would pass `address` for the user and return the `portfolio` object, with the fields `totals`, and `totalByNetworkWithNFT`. Example of the response below:


```json
{
  "data": {
    "portfolio": {
      "totals": {
        "total": 11252.6887398181,
        "totalByNetwork": [
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


### Example Query

```graphql
query Portfolio($addresses: [Address!]!) {
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
}
```

### Example Variables

```json
{
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
}
```

<LinkButton href="/sandbox" type="primary" buttonCopy="Try in sandbox" />

### Reference

<details>
<summary>Arguments for totals</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Required: Address you are querying balances for    | `String!` | 
| `networks`      | Networks for which to retrieve balances for, inputted an array.      | `Network!` | 
| `appIds`      | Filter by a specific app       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

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