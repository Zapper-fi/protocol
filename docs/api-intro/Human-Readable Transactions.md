---
sidebar_position: 1
---

## Account Timelines

Timelines provide a chronological sequence of transactions, or `events`, each accompanied by a human-readable interpretation. These entries offer a descriptive summary of the transaction's details, including the application involved and a list of tokens transferred.

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
> List Human-readable transactions from one or multiple wallets, along with tokens transferred, paginated, chain-agnostic

## App Feeds

Receive a paginated payload of interpreted events for a given app and network

Code snippet test:

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
> List Human-readable transactions made using an application, ordered by date, paginated, across chains

## Received Tokens

List Latest tokens received by wallet where the wallet is not the signer of the transaction

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