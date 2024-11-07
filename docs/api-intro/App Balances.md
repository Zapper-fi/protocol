---
sidebar_position: 4
---

Description of the category of queries goes here. How it could be used in applications...etc.etc.

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

Arguments for `AppBalance`

| Name      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Description goes here.       | `String!` | 
| `networks`      | Description goes here.       | `Network!` | 
| `appIds`      | Description goes here.       | `String!` | 
| `withOverrides`      | Description goes here.       | `Boolean = false` | 

Fields for `AppBalance`

| Name      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | Description goes here.       | `String!`       |
| `address`      | Description goes here.       | `String!`       |
| `appId`      | Description goes here.       | `String!`       |
| `appName`      | Description goes here.       | `String!`       |
| `appImage`      | Description goes here.       | `String!`       |
| `network`      | Description goes here.       | `Network!`       |
| `updatedAt`      | Description goes here.       | `Timestamp!`       |
| `balanceUSD`      | Description goes here.       | `Float!` | 
| `products`      | Description goes here.       | `ProductItem!`       |
