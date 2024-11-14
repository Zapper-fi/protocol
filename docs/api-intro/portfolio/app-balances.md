---
sidebar_position: 4
sidebar_label: App Balances
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# App Balances

Surfaces balances that a user might hold inside of an onchain application.

---

### `appBalances`

The `appBalances` query takes an `address` with optional `networks` or `appIds` and returns fields such as `appId`, `appName`, `balanceUSD`, `assets`, `label` and other data useful for app balance use cases.

### Example Use Case: App Positions

Imagine you want to surface all positions a user has across in every onchain app they have used for a particular network. You would pass `address` for the user and `network` for the selected chain returning the `appBalances` object, with fields such as `address`, `appName`, `balanceUSD`, `network`, and `products`.

#### Example Variables

```json
{
  "addresses": ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"]
}
{
  "networks": "OPTIMISM_MAINNET",
}
```

#### Example Query

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

#### Example Response

```json
  {
    "address": "0xe321bd63cde8ea046b382f82964575f2a5586474",
    "appName": "Aave V3",
    "balanceUSD": 46.05200420761579,
    "network": "OPTIMISM_MAINNET",
    "products": [
      {
        "label": "Lending",
           "assets": [
              {
                "address": "0x513c7e3a9c69ca3e22550ef58ac1c0088e918fff"
              },
              {
                "address": "0x625e7708f30ca75bfd92586e17077590c60eb4cd"
              },
              {
               "address": "0xe50fa9b3c56ffb159cb0fca61f5c9d750e8128c8"
                }
        }
}
```

:::note

Smart accounts accounts like Maker’s `DSProxy` are automatically included in the balance response as part of an “implicit” bundle.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

:::


  <LinkButton href="./sandbox" type="primary" buttonCopy="Try in sandbox" />

  ---


### Reference

<details>
<summary>Arguments for appBalances</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | Required: Address you are querying balances for, inputted an array.     | `String!` | 
| `networks`      | Networks for which to retrieve balances, inputted an array.       | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 

</details>

<details>
<summary>Fields for appBalances</summary>


| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Address the position queried is for       | `String!`       |
| `appId`      | ID of the app      | `String!`       |
| `appImage`      | Icon of the app      | `String!`       |
| `appName`      | Display name of app       | `String!`       |
| `balanceUSD`      | Value of all positions associated with this app on this network for this wallet, in USD      | `Float!` | 
| `key`      | Description goes here.       | `String!`       |
| `network`      | Network(s) the app is on.       | `Network!`       |
| `products`      | Object containing details on all products owned by this wallet       | `ProductItem!`       |
| `updatedAt`      | Timestamp at which time this wallet's balance for this app was calculated   | `Timestamp!`       |

</details>