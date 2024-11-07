---
sidebar_position: 1
---

Description of the category of queries goes here. How it could be used in applications...etc.etc.

---
### `SummaryTimelineQuery`

Provides a chronological sequence of transactions, or `events`, each accompanied by a human-readable interpretation. These entries offer a descriptive summary of the transaction's details, including the application involved and a list of tokens transferred.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

Please note that the textual description of each transaction is presented from the perspective of the signer. Events with descriptions such as "Did something with …" indicate that an interpreter for that type of onchain interaction is not available, yet.


```sh
query SummaryTimelineQuery(
  $addresses: [Address!]!
  $after: String
  $first: Int
  $inboundFirst: Int
  $outboundFirst: Int
  $realtimeInterpretation: Boolean
  $network: Network
  $tokenAddresses: [Address!]
  $isSigner: Boolean
)
```
*List Human-readable transactions from one or multiple wallets, along with tokens transferred, paginated, chain-agnostic*


### `AppTimelineQuery`

Returns a paginated payload of interpreted events for a given app and network


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
*List Human-readable transactions made using an application, ordered by date, paginated, across chains*


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

Fields for `SummaryReceivedTimelineQuery`

| Name      | Example |
| ----------- | ----------- |
| `timestamp`      | ex: 1730939855000       |
| `network`   | Network Name ex: `BASE_MAINNET`     |
| `price`   | in USD ex: `2810.08`       |
| `totalLiquidity`   | in USD        |
| `imageUrl`   | URL path        |
| `symbol`   | Ex: `ETH`        |
| `id`   | ??        |
| `amount`   | Quantity Receieved        |
| `address`   | Token Address        |