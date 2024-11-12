---
sidebar_position: 1
sidebar_label: Human-Readable Transactions
---
import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';

export const accountsTimelineQuery = `query($addresses: [Address!]) {
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
          toUser {
            displayName {
              value
            }
          }
        }
        interpretation {
          processedDescription
        }
      }
    }
  }
}`;

export const accountsTimelineVariables = {
  "addresses": [
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    "0x6f6e75fb472ee39d847d825cc7c9a613e227e261"
  ]
};

# Human-Readable Transactions


Presents onchain activity in a simple descriptive summary including references to dynamic elements of the transaction such as tokens, NFTs, and accounts. Great for use in account histories, social feeds, or app specific feeds.

---

### `accountsTimeline`

The `accountsTimeline` query returns human-readable transactions that offer a descriptive summary of the transaction's details from one or multiple wallets, along with tokens transferred, paginated, chain-agnostic. Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

### Common Uses

##### Onchain Activity Feed

Let's say you want to show users an activity feed for their onchain transactions in a human-readable format with network and app information. You would pass `addresses` for the user and return `processedDescription`, `network`, and `app`. Example of the response below:

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
  
      "network": "BASE_MAINNET"

    "app": {
      "name": "Tokiemon",
      },
}
```

:::note
Textual description of each transaction is presented from the perspective of the signer. Events with descriptions such as "Did something with …" indicate that an interpreter for that type of onchain interaction is not available, yet.
:::

### Sandbox

<ApolloSandboxComponent 
  query={accountsTimelineQuery}
  variables={accountsTimelineVariables}
/>

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
| `first`      | -      | `Int!`        | 
| `after`      | -      | `String!`        | 



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
| `source`      | -       | `String!`       |
| `eventType`      | Returns the event type.       | `String!`       |
| `isAbiAvailable`      | -       | `Boolean!`       |
| `isEditable`      | -       | `Boolean!`       |
| `interpreterId`      | -      | `String!`       |
| `interpreter`      | -      | `ActivityEventInterpreter!`       |
| `actors`      | -       | `ActorDisplayItem!`       |
| `timestamp`      | -       | `Timestamp!`       |
| `perspective`      | -       | `ActivityPerspective!`       |
| `similarEventCount`      | -       | `String!`       |
| `perspectiveDelta`      | -       | `ActivityAccountDelta!`       |
| `sigHash`      | -       | `String!`       |

</details>
