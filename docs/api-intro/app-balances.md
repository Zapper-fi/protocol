---
sidebar_position: 4
sidebar_label: App Balances
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# App Balances

Surfaces balances that a user might hold inside of an onchain application. Use cases include showing DeFi positions, claimables, or portfolio tracking.

---

### `AppBalance`

Returns indexed DeFi or other app balances for an account address on a set of networks (and optionally, for a set of app slugs)

:::note

Smart accounts accounts like Maker's `DSProxy` are automatically included in the balance response as part of an "implicit" bundle.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

:::

### Reference

<details>
<summary>Arguments for AppBalance</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Addresses for which to retrieve balances, inputted as an array.     | `String!` | 
| `networks`      | Networks for which to retrieve balances, inputted an array.       | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

</details>

<details>
<summary>Fields for AppBalance</summary>

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

</details>

### Example Query

```graphql
query Portfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    appBalances {
      address
      appName
      balanceUSD
      network
      products {
        label
        assets {
          address
        }
      }
    }
  }
}
```

### Example Variables

```json
{
  "addresses": ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"]
}
```

<Link to="/sandbox">
  <LinkButton href="/docs/api-intro/sandbox" type="primary" buttonCopy="Try in sandbox" />
</Link>