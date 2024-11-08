---
sidebar_position: 1
---

Presents onchain activity in a simple descriptive summary. Great for use in account histories, social feeds, or app specific feeds.

---

:::note
Textual description of each transaction is presented from the perspective of the signer. Events with descriptions such as "Did something with …" indicate that an interpreter for that type of onchain interaction is not available, yet.
:::

### `accountsTimeline`

Returns human-readable transactions that offer a descriptive summary of the transaction's details from one or multiple wallets, along with tokens transferred, paginated, chain-agnostic. Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

```sh
query accountsTimeline(addresses: $addresses) {
  }
```

**Apollo Sandbox Goes Here**

Arguments for `accountsTimeline`

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

Fields for `accountsTimeline`

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


### `AppTimelineQuery`

Returns human-readable transactions made using an application, ordered by date, paginated, across chains.


```sh
query AppTimelineQuery(
  $appSlug: String!
  $after: String
  $first: Int
  $network: Network
  $inboundFirst: Int
  $outboundFirst: Int
)
```


### `SummaryReceivedTimelineQuery`

Returns a timeline of events where tokens were received by the address but the address is not the signer of the transaction.

```sh
query SummaryReceivedTimelineQuery(
  $addresses: [Address!]!
  $after: String
  $first: Int
  $realtimeInterpretation: Boolean
  $network: Network
  $tokenAddresses: [Address!]
  $isSigner: Boolean
) 
```