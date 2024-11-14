---
sidebar_position: 1
---

# Getting Started

Access powerful onchain data curated by the Zapper Protocol with a GraphQL API.

---

## What can I get?

### [Human-Readable Transactions](/docs/api-intro/human-readable-transactions)

Simplify onchain transactions with human-friendly descriptions.

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

Example:

Header Key : "Authorization"
Header Value : "Basic YOUR_API_KEY_BASE_64=="

 `Authorization: Basic YOUR_API_KEY_BASE_64==`
:::


#### 3) Buy Credits

Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits, and these credits are deducted from the accounts credit balance.

Track usage and purchase additional credits on the [Dashboard](/dashboard).

:::info

The Zapper GraphQL API is in beta. If you run into any issues please share your feedback, it is much appreciated. 

If you are a client of the legacy REST API you automatically have access to the new GraphQL endpoints with your exisiting API key, upon sign in to the Zapper Protocol Dashboard. You can manage your account on the new [Dashboard](/dashboard), purchase credits for the new GraphQL API, as well as view your legacy REST API credits. Log in with the email associated with your exisiting account to gain access.

You can also find the legacy REST API documentation [here](https://studio.zapper.xyz/docs/apis/getting-started) however we are asking all existing clients to migrate to the new GraphQL endpoints.

Please reach out to ops@zapper.xyz if you have any questions.

:::