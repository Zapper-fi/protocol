---
sidebar_position: 3
sidebar_label: App Timelines
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# App Timelines


Displays a timeline of transactions that happened in a particular onchain app via their smart contracts.

---

### `timelineForApp`

The `timelineForApp` query takes an app name in the form of a `slug`. It returns a `processedDescription` or `description`. If returning `description`, `descriptionDisplayItems` such as `TokenDisplayItem` will be used to surface onchain items embedded within the human-readable description.

:::tip
To find the correct `slug` for the app you are trying to reference, find the app on Zapper, and the slug is the last part of the URL. For example for https://zapper.xyz/apps/cat-town, the slug is `cat-town`. 
:::


### Example Use Case: App Activity Feed

Let's say you want to to add an activity feed inside of your app that shows your users onchain activity in a human-readable format. Start by passing `slug` for the app name. Then return `processedDescription`, the `account` object with `displayName` and `value`. Also include the `transaction` object with `timestamp` and `hash` so you can display when the transaction happened and use the hash to link out to a block explorer.

#### Example Variable

```js
{
  "slug": "cat-town"
}
```

#### Example Query

```graphql
query($slug: String!) {
  timelineForApp(slug: $slug) {
    edges {
      node {
        interpretation {
          processedDescription
        }
        actors {
          account {
            address
            displayName {
              value
            }
          }
        }
        transaction {
          timestamp
          hash
        }
      }
    }
  }
}
```

#### Example Response

```js
          "node": {
            "interpretation": {
              "processedDescription": "Sold 4 Cat Town | Items for 3,020 KIBBLE"
            },
            "actors": [
              {
                "account": {
                  "address": "0xd11d977c262793ab3c39339a0fdf2d1687ec81da",
                  "displayName": {
                    "value": "meowww.base.eth"
                  }
                }
              },
              {
                "account": {
                  "address": "0x10a77395a07917c5eb71feeb86696b7612f9730f",
                  "displayName": {
                    "value": "0x10a7...730f"
                  }
                }
              }
            ],
            "transaction": {
              "timestamp": 1732171389000,
              "hash": "0xc6733c9f822bd1f71a6e97ccce34dcd6e46aee7286f22f1a8199a0beeebb1ee6"
            }
          }
```


<SandboxButton/>

---

:::tip
If you want to surface tokens, NFTs, accounts, or other onchain items embedded within the human-readable description of a transaction, you should return `description` and `descriptionDisplayItems` instead of `processedDescription`. To learn more about how to use these check out the example for [Single Transactions](/docs/api-intro/human-readable-transactions/timeline-event).
:::

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | A network to retreive.    | `Network`        | 
| `networks`      | The networks to retreive, input as an array.    | `Network!`        | 
| `realtimeInterpretation`      | Human-readable transactions, default is on.       | `Boolean = true`        | 
| `spamFilter`      | Filter for spam, default is on.      | `Boolean = true`        | 
| `first`      | Used for pagination.      | `Int!`        | 
| `after`      | Used for pagination.       | `String!`        | 


### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | A transaction hash.     | `String!`       |
| `network`      | Network on which the transaction happened.     | `Network!`       |
| `interpretation`      | Contains fields needed to present a human-readable transaction such as `description`, `processedDescription`, and `descriptionDisplayItems`.     | `Network!`       |
| `description`      | The human-readble description of the transaction with variables referencing types such as tokens, NFTs, or accounts.      | `String!`       |
| `processedDescription`      | The human-readble description of the transaction.      | `String!`       |
| `descriptionDisplayItems`      | Contains the fields which the variables in `description` make reference to.      | `ActivityFeedDisplayItem!!`       |
| `transaction`      | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.       | `OnChainTransaction!`       |
| `app`      | The app that is associated with the transaction.     | `Int!`       |
| `actors`      | The address(s) involved in the transaction, includes the object `account` that can surface data such as `address`, `displayName`,and `avatar`.    | `ActorDisplayItem!`      |
| `displayName`      | Returns the display name of an address (ENS, Farcaster, Lens, etc.).   | `Int!`       |
| `timestamp`      | Represents date and time as number of milliseconds from start of UNIX epoch.       | `Timestamp!`       |
| `perspective`      | The address whose perspective is used in deltas.       | `ActivityPerspective!`       |
| `perspectiveDelta`      | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.       | `ActivityAccountDelta!`       |
| `accountDeltasV2`      | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.       | `ActivityAccountDelta!`       |
| `tokenDeltasV2`      | Returns info on the tokens transfered in the transaction such as `address`, `amount`, as well as the `token` object with more token specific info.        | `FungibleTokenDeltaConnection!!`       |
| `nftDeltasV2`      | Returns info on the NFTs transfered in the transaction such as `collectionAddress`, `tokenId`, as well as `attachment` which surfaces other NFT specific fields.       | `NftDeltaConnection!`       |
| `interpreterId`      | Unique identifier for the Interpreter.      | `String!`       |
| `interpreter`      | Object which contains info on the interpreter such as `app` and `category`.      | `ActivityEventInterpreter!`       |
| `sigHash`      | Returns the sigHash for the transaction.       | `String!`       |
