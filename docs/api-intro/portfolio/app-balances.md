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

The `appBalances` query takes an `address` with optional `networks` or `appIds`. It returns fields such as `appId`, `appName`, `balanceUSD`, `assets`, `label` and other data useful for app balance use cases.

### Example Use Case: App Positions

Let's say you want to surface all positions a user has in every onchain app on a particular network. Start by passing `address` for the user and `network` for the selected network. Then return the `appBalances` object, with the fields `address`, `appName`, `balanceUSD`, `network`, and `products`.

#### Example Variables

```json
{
  "addresses": ["0xe321bd63cde8ea046b382f82964575f2a5586474"],
  "networks": ["OPTIMISM_MAINNET"]
}
```

#### Example Query

```
query Portfolio($addresses: [Address!]!, $networks: [Network!]) {
  portfolio(addresses: $addresses, networks: $networks) {
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
       ]
     }
   ]
}
```

:::note

Smart accounts like Maker’s `DSProxy` are automatically included in the balance response as part of an “implicit” bundle.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

:::


  <LinkButton href="./sandbox" type="primary" buttonCopy="Try in sandbox" />

  ---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.        | `Address!` | 
| `networks`      | The network(s) to retreive balances on, input as an array.      | `Network!` | 
| `appIds`      | Filter by a specific app.       | `String!` | 

### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Address that owns the position.       | `String!`       |
| `appId`      | ID of the app.      | `String!`       |
| `appImage`      | URL containing the logo image of the app.      | `String!`       |
| `appName`      | Display name of app.       | `String!`       |
| `balanceUSD`      | Value of all positions for the specified app in USD.      | `Float!` | 
| `network`      | Network the position is on.       | `Network!`       |
| `products`      | Object containing details on all products owned by the specified address.       | `ProductItem!`       |
| `updatedAt`      | Timestamp of when the balance was calculated.   | `Timestamp!`       |
| `key`      | -      | `String!`       |
