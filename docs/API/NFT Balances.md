---
sidebar_position: 3
---

---

# NFT Balances

hi this is a test wow

Zapper Protocol will be offering a GraphQL API for developers to access interpreted data. This API will be the primary way for developers to access onchain data from Zapper Protocol.

:::tip
You can access Zapper's existing REST API [here](https://studio.zapper.xyz/docs/apis/getting-started), which supports portfolio tracking capabilities.
Zapper Protocol's GraphQL API will be released in Q4 2024, at which time users of the REST API will be asked to migrate.
:::

---

## Data Types

The Zapper Protocol API will offer the following data types:

### Events

Zapper Protocol will get developers access to interpreted events. For more information on Event Interpretation, check out our [Event Interpretation Overview](/docs/interpretation/event-interpretation/overview).

- **Interpreted Events**: Transactions across all supported chains that have been interpreted by Zapper Protocol. Data will be keyed on the transaction hash
- **Interpreted Account Timelines**: Receive a paginated payload of interpreted events for a given account
- **App Feeds**: Receive a paginated payload of interpreted events for a given app and network

### Portfolio Tracking

Zapper Protocol will offer interpreted valuations for tokens, investments and NFTs. 

For more information on Position Interpretation, check out our [position interpreter overview](/docs/interpretation/position-interpretation/overview.md).

<!-- ### Trending Onchain Apps

Track the most popular apps onchain, based on onchain activity from contracts owned by that app -->

### Contract / Address Labelling

This endpoint will return information about a given contract, such as its label (i.e. `Uniswap v2 DAI / USDC Pool`), as well as what app owns the contract, such as all contracts owned by Balancer V2 on Polygon Network. Data will be keyed to the account address.

---
## Launch Timeline

Zapper Protocol is targeting a Q4 2024 release of the GraphQL endpoint.

---
## Existing REST API

Zapper currently has a REST API that developers can use to access interpreted data, launched in 2022. This API provides some of the data referenced above and can be used today.

We will be deprecating the REST API when the GraphQL API is released, with plenty of notice given to existing users on a timeline and how to migrate.

Developers can read more about Zapper's [existing REST API here](https://studio.zapper.xyz/docs/apis/getting-started).
