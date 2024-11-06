---
sidebar_position: 1
---


- **Interpreted Events**: Transactions across all supported chains that have been interpreted by Zapper Protocol. Data will be keyed on the transaction hash
- **Interpreted Account Timelines**: Receive a paginated payload of interpreted events for a given account
- **App Feeds**: Receive a paginated payload of interpreted events for a given app and network

Timelines provide a chronological sequence of transactions, or events, each accompanied by a human-readable interpretation. These entries offer a descriptive summary of the transaction's details, including the application involved and a list of tokens transferred.

Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

Please note that the textual description of each transaction is presented from the perspective of the signer. Events with descriptions such as "Did something with …" indicate that an interpreter for that type of onchain interaction is not available, yet.

:::tip
You can access Zapper's existing REST API [here](https://studio.zapper.xyz/docs/apis/getting-started), which supports portfolio tracking capabilities.
Zapper Protocol's GraphQL API will be released in Q4 2024, at which time users of the REST API will be asked to migrate.
:::

