---
sidebar_position: 1
---

# Getting Started

Access powerful onchain data curated by the Zapper Protocol with a GraphQL API.

---

## What can I get?

### [Human-Readable Transactions](/docs/api-intro/human-readable-transactions/timeline-event)

Simplify onchain transactions with human-friendly descriptions. Queries for [Single Transactions](/docs/api-intro/human-readable-transactions/timeline-event), [App Timelines](/docs/api-intro/human-readable-transactions/app-timelines), or [Account Timelines](/docs/api-intro/human-readable-transactions/account-timelines).

### [Onchain Identity](/docs/api-intro/onchain-identity)

Surface onchain identity such as avatars, ENS, Farcaster, and more.

### [Portfolio Data](/docs/api-intro/portfolio/claimables)

A set of portfolio queries to fetch [Tokens](/docs/api-intro/portfolio/token-balances), [NFTs](/docs/api-intro/portfolio/nft-balances), [App Balances](/docs/api-intro/portfolio/app-balances), [Portfolio Totals](/docs/api-intro/portfolio/portfolio-totals), and [Claimables](/docs/api-intro/portfolio/claimables).

### [Onchain Prices](/docs/api-intro/onchain-prices)

A price for every token that has an onchain market, including historical data.

## Quickstart

### 1) Get an API key

Visit the [Dashboard](/dashboard) to get an API key.

### 2) Get set up

Grab the API key, store it in a safe place, and use it to securely access the API.

#### Curl Request Example

```graphql
curl --location 'https://public.zapper.xyz/graphql' --header 'Content-Type: application/json' --header 'Authorization: YOUR_API_KEY_ENCODED --data '{"query":"query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!, $withOverrides: Boolean) { portfolio(addresses: $addresses, networks: $networks, withOverrides: $withOverrides) { tokenBalances { address network token { balance balanceUSD balanceRaw baseToken { name label symbol address } } } appBalances { address network updatedAt balanceUSD appName } nftBalances { balanceUSD network } } }","variables":{"addresses":["0x3d280fde2ddb59323c891cf30995e1862510342f","0x6f6e75fb472ee39d847d825cc7c9a613e227e261"],"networks":["BASE_MAINNET","ETHEREUM_MAINNET"]}}'
```

:::note
The API key must be Base64 encoded and passed with the `Basic` prefix in the Authorization Header.

Example: `Authorization: Basic YOUR_API_KEY_BASE_64==`

Header Key : "Authorization"

Header Value : "Basic YOUR_API_KEY_BASE_64=="


:::


#### 3) Buy Credits

Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits which can be found by visiting [Pricing](/docs/api-intro/pricing). All credits spent on API queries are deducted from the accounts credit balance.

Track usage and purchase additional credits on the [Dashboard](/dashboard).

:::info

The Zapper GraphQL API is in alpha. If you run into any issues please share your feedback, it is much appreciated. 

If you are a client of the legacy [REST API](https://studio.zapper.xyz/docs/apis/getting-started) you automatically have access to the new GraphQL endpoints with your existing API key. Access the new [Dashboard](/dashboard) by signing in with the email associated with your existing account.

Please note that the alpha is primarily meant for testing. During beta, you will be able migrate your existing legacy credits to use on the new queries as we will ask all existing clients to begin migrating to the new GraphQL endpoints. Bulk purchase discounts will also be introduced at this time.


Please reach out to ops@zapper.xyz if you have any questions.

:::