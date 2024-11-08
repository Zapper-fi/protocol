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

Presents onchain activity in a simple descriptive summary including references to dynamic elements of the transaction such as tokens, NFTs, and accounts. Great for use in account histories, social feeds, or app specific feeds.

---

### `accountsTimeline`

Returns human-readable transactions that offer a descriptive summary of the transaction's details from one or multiple wallets, along with tokens transferred, paginated, chain-agnostic. Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

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
| `first`      | -      | `Int!`        | 
| `after`      | -      | `String!`        | 
| `spamFilter`      | Filter for spam, default is on      | `Boolean = true`        | 
| `realtimeInterpretation`      | Human-readable transactions, default is on       | `Boolean = true`        | 
| `addresses`      | Addresses to retrive, inputted as an array.   | `String!`        | 
| `tokenAddresses`      | Filter by token address        | `Address!`        | 
| `isSigner`      | Filter by signer        | `Boolean`        | 

</details>

<details>
<summary>Fields for accountsTimeline</summary>


| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | A unique identifier       | `String!`       |
| `network`      | Network the transaction happened on     | `Network!`       |
| `source`      | -       | `String!`       |
| `eventType`      | Returns the event type       | `String!`       |
| `isAbiAvailable`      | -       | `Boolean!`       |
| `isEditable`      | -       | `Boolean!`       |
| `interpreterId`      | -      | `String!`       |
| `interpreter`      | -      | `ActivityEventInterpreter!`       |
| `actors`      | -       | `ActorDisplayItem!`       |
| `timestamp`      | -       | `Timestamp!`       |
| `perspective`      | -       | `ActivityPerspective!`       |
| `interpretation`      | -      | `ActivityInterpretation!`       |
| `transaction`      | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.       | `OnChainTransaction!`       |
| `similarEventCount`      | -       | `String!`       |
| `app`      | Associated app for the transaction     | `Int!`       |
| `perspectiveDelta`      | -       | `ActivityAccountDelta!`       |
| `sigHash`      | -       | `String!`       |

</details>
