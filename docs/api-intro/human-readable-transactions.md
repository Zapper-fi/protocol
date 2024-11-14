---
sidebar_position: 1
sidebar_label: Human-Readable Transactions
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Human-Readable Transactions


Presents onchain activity in a simple descriptive summary including references to dynamic elements of the transaction such as tokens, NFTs, and accounts. Great for use in account histories, social feeds, or app specific feeds.

---

### `accountsTimeline`

The `accountsTimeline` query returns a descriptive and human-readable summary of the transaction's details from one or multiple wallets, along with tokens transferred, paginated, chain-agnostic. Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

### Example use case: Transaction History

Let's say you want to show users activity for their onchain transactions in a human-readable format with the network it was on and what app was used. You would pass `addresses` for the user and return `processedDescription`, `network`, and the `app` object with `name` and `imgUrl`. Part of the response is show below:

```json
{
  "fromUser": {
    "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b",
      "displayName": {
          "value": "0xjasper.eth"
          }
    }

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

:::note
Textual description of each transaction is presented from the perspective of the signer. Events with descriptions such as "Did something with …" indicate that an interpreter for that type of onchain interaction is not available, yet.
:::

### Example Query

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
}
```

### Example Variables

```json
{
  "addresses": [
    "0x52c8ff44260056f896e20d8a43610dd88f05701b",
    "0x6f6e75fb472ee39d847d825cc7c9a613e227e261"
  ]
}
```

<LinkButton href="./sandbox" type="primary" buttonCopy="Try in sandbox" />


### Reference

<details>
<summary>Arguments for accountsTimeline</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | Networks for which to retrieve, inputted as an array.    | `Network!`        | 
| `realtimeInterpretation`      | Human-readable transactions, default is on       | `Boolean = true`        | 
| `addresses`      | Addresses to retrive, inputted as an array.   | `String!`        | 
| `tokenAddresses`      | Filter by token address        | `Address!`        | 
| `isSigner`      | Filter by signer        | `Boolean`        | 
| `spamFilter`      | Filter for spam, default is on      | `Boolean = true`        | 
| `first`      | Used for pagination.      | `Int!`        | 
| `after`      | Used for pagination.       | `String!`        | 



</details>

<details>
<summary>Fields for accountsTimeline</summary>


| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | A unique identifier.       | `String!`       |
| `network`      | Network on which the transaction happened.     | `Network!`       |
| `processedDescription`      | The human-readble description of the transaction.      | `ActivityInterpretation!`       |
| `transaction`      | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.       | `OnChainTransaction!`       |
| `app`      | The app that is associate with the transaction.     | `Int!`       |
| `fromUser`      | The address that the transaction was initiated from.     | `Int!`       |
| `toUser`      | The address that the transaction interacted with.     | `Int!`       |
| `displayName`      | Returns the display name of an address (ENS, Farcaster, Lens, etc.).   | `Int!`       |
| `actors`      | Address(s) that were involved in the transaction. Could include accounts, tokens, NFTs, contracts, etc.      | `ActorDisplayItem!`       |
| `timestamp`      | Represents date and time as number of milliseconds from start of UNIX epoch.       | `Timestamp!`       |
| `perspective`      | The address whose perspective is used in deltas.       | `ActivityPerspective!`       |
| `perspectiveDelta`      | Object containing different deltas such as `tokenDetlasV2`, `nftDeltasV2`,       | `ActivityAccountDelta!`       |
| `tokenDeltasV2`      | Returns info on the tokens transfered in the transaction such as `address`, `amount`, as well as the `token` object with more token specific info.        | `FungibleTokenDeltaConnection!!`       |
| `nftDeltasV2`      | Returns info on the NFTs transfered in the transaction such as `collectionAddress`, `tokenId`, as well `attachment` which surfaces other NFT specific fields.       | `FungibleTokenDeltaConnection!!`       |
| `interpreterId`      | Unique Identifier for the Zapper Protocol Interpreter      | `String!`       |
| `interpreter`      | Object which contains info on the interpreter such as `app` and `category`.      | `ActivityEventInterpreter!`       |
| `sigHash`      | Returns the sigHash for the transaction.       | `String!`       |

</details>