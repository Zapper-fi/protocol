---
sidebar_position: 4
---

import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';


Surfaces balances that a user might hold inside of an onchain application. Use cases include showing DeFi positions, claimables, or portfolio tracking.

---

:::note

Smart accounts accounts like Maker’s `DSProxy` are automatically included in the balance response as part of an “implicit” bundle.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

:::

### `AppBalance`

Returns indexed DeFi or other app balances for an account address on a set of networks (and optionally, for a set of app slugs)


```sh
query($addresses: [Address!]!) {
    portfolio(addresses: $addresses) {
      appBalances {
      }
    }
```

<ApolloSandboxComponent />

<details>
<summary>Test Collapsable</summary>

BODY CONTENT

</details>

Arguments for `AppBalance`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Addresses for which to retrieve balances, inputted as an array.     | `String!` | 
| `networks`      | Networks for which to retrieve balances, inputted an array.       | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

Fields for `AppBalance`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | Description goes here.       | `String!`       |
| `address`      | Address the position queried is for       | `String!`       |
| `appId`      | ID of the app      | `String!`       |
| `appName`      | Display name of app       | `String!`       |
| `appImage`      | Icon of the app      | `String!`       |
| `network`      | Network(s) the app is on.       | `Network!`       |
| `updatedAt`      | Timestamp at which time this wallet's balance for this app was calculated   | `Timestamp!`       |
| `balanceUSD`      | Value of all positions associated with this app on this network for this wallet, in USD      | `Float!` | 
| `products`      | Object containing details on all products owned by this wallet       | `ProductItem!`       |