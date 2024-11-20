---
sidebar_position: 1
sidebar_label: Account Timelines
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Human-Readable Transactions


Presents onchain activity in a simple descriptive summary with references to dynamic elements of the transaction such as tokens, NFTs, and accounts. Great for use in account histories, social feeds, or app-specific feeds.

---

### `accountsTimeline`

The `accountsTimeline` query takes `addresses` input as an array, with optional `networks`. It returns a descriptive and human-readable summary of the transaction's details from one or multiple wallets with tokens transferred — paginated and chain-agnostic.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

### Example Use Case: Transaction History

Let's say you want to show users their onchain transactions in a human-readable format with network and app information. Start by passing `addresses` for the user. Then return `processedDescription`, `network`, and the `app` object with the fields `name` and `imgUrl`.

#### Example Variable

```js
{
  "addresses": ["0x52c8ff44260056f896e20d8a43610dd88f05701b"]
}
```

#### Example Query

```graphql
query($addresses: [Address!]) {
  accountsTimeline(addresses: $addresses) {
    edges {
      node {
        transaction {
          fromUser {
            address
            displayName {
              value
            }
          }
        }
        interpretation {
          processedDescription
        }
         app {
          name
          imgUrl
        }
        network
        }
      }
    }
  }
```

#### Example Response

```js
{
  "fromUser": {
    "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b",
      "displayName": {
          "value": "0xjasper.eth"
          }
    },
    "interpretation": {
      "processedDescription": "Started battle with sebaudet.eth"
      },
      "app": {
            "name": "Tokiemon",
            "imgUrl": "https://storage.googleapis.com/zapper-fi-assets/apps%2Ftokiemon.png"
            },
      "network": "BASE_MAINNET"
}
```


<SandboxButton/>

---

:::note
Textual description of each transaction is presented from the perspective of the signer. Events with descriptions such as "Did something with …" indicate that an interpreter for that type of onchain interaction has not yet been curated through [interpretation](/docs/Interpretation/overview).
:::

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | The network(s) to retreive, input as an array.    | `Network!`        | 
| `realtimeInterpretation`      | Human-readable transactions, default is on.       | `Boolean = true`        | 
| `addresses`      | The address(s) that is being queried, input as an array.   | `Address!`        | 
| `tokenAddresses`      | Filter by token address.        | `Address!`        | 
| `isSigner`      | Filter by signer.        | `Boolean`        | 
| `spamFilter`      | Filter for spam, default is on.      | `Boolean = true`        | 
| `first`      | Used for pagination.      | `Int!`        | 
| `after`      | Used for pagination.       | `String!`        | 


### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | A unique identifier.       | `String!`       |
| `network`      | Network on which the transaction happened.     | `Network!`       |
| `processedDescription`      | The human-readble description of the transaction.      | `ActivityInterpretation!`       |
| `transaction`      | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.       | `OnChainTransaction!`       |
| `app`      | The app that is associated with the transaction.     | `Int!`       |
| `fromUser`      | The address that the transaction was initiated from.     | `Int!`       |
| `toUser`      | The address that the transaction interacted with.     | `Int!`       |
| `displayName`      | Returns the display name of an address (ENS, Farcaster, Lens, etc.).   | `Int!`       |
| `actors`      | Address(s) that were involved in the transaction. Could include accounts, tokens, NFTs, contracts, etc.      | `ActorDisplayItem!`       |
| `timestamp`      | Represents date and time as number of milliseconds from start of UNIX epoch.       | `Timestamp!`       |
| `perspective`      | The address whose perspective is used in deltas.       | `ActivityPerspective!`       |
| `perspectiveDelta`      | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.       | `ActivityAccountDelta!`       |
| `tokenDeltasV2`      | Returns info on the tokens transfered in the transaction such as `address`, `amount`, as well as the `token` object with more token specific info.        | `FungibleTokenDeltaConnection!!`       |
| `nftDeltasV2`      | Returns info on the NFTs transfered in the transaction such as `collectionAddress`, `tokenId`, as well as `attachment` which surfaces other NFT specific fields.       | `NftDeltaConnection!`       |
| `interpreterId`      | Unique identifier for the Interpreter.      | `String!`       |
| `interpreter`      | Object which contains info on the interpreter such as `app` and `category`.      | `ActivityEventInterpreter!`       |
| `sigHash`      | Returns the sigHash for the transaction.       | `String!`       |
