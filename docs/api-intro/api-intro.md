---
sidebar_position: 1
---

# Getting Started

Access powerful onchain data curated by the Zapper protocol with a GraphQL API for your applications.

---

## What can I get?

#### [Human-Readable Transactions](/docs/api-intro/human-readable-transactions)

Simplify onchain transactions with human-friendly descriptions.

#### [Onchain Identity](/docs/api-intro/onchain-identity)

Enrich your app by surfacing onchain identity such as avatars, ENS, Farcaster, and more.

#### [Portfolio Data](/docs/api-intro/portfolio/claimables)

A set of portfolio queries to fetch [Tokens](/docs/api-intro/portfolio/token-balances), [NFTs](/docs/api-intro/portfolio/nft-balances), [App Balances](/docs/api-intro/portfolio/app-balances), [Portfolio Totals](/docs/api-intro/portfolio/portfolio-totals), and [Claimables](/docs/api-intro/portfolio/claimables).

#### [Onchain Prices](/docs/api-intro/onchain-prices)

A price for every token that has an onchain market, including historical data.

## Quickstart

#### 1) Get an API key

Visit the **[Dashboard](/dashboard)** to get your API key.

#### 2) Get Set up

Grab your API Key, store it in a safe place, and now you can use it to securely access the API.

#### Curl Rquest Example

```graphql
curl --location 'https://public.zapper.xyz/graphql' --header 'Content-Type: application/json' --header 'Authorization: YOUR_API_KEY_ENCODED --data '{"query":"query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!, $withOverrides: Boolean) { portfolio(addresses: $addresses, networks: $networks, withOverrides: $withOverrides) { tokenBalances { address network token { balance balanceUSD balanceRaw baseToken { name label symbol address } } } appBalances { address network updatedAt balanceUSD appName } nftBalances { balanceUSD network } } }","variables":{"addresses":["0x3d280fde2ddb59323c891cf30995e1862510342f","0x6f6e75fb472ee39d847d825cc7c9a613e227e261"],"networks":["BASE_MAINNET","ETHEREUM_MAINNET"]}}'
```

:::note
The API key must be Base64 encoded and passed with the `Basic` prefix in the Authorization header. For example, if your API key is `my-api-key`, you would encode it as Base64 and use: `Authorization: Basic bXktYXBpLWtleQ==`
:::


#### 3) Buy credits

Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits, and these credits are deducted from your credit balance.

You can track your usage and purchase additional credits on the **[Dashboard](/dashboard)**

:::info

The Zapper Graph QL API is in beta. If you run into any issues please share your feedback, it's much appreciated. If you are looking for the legacy REST API you can find it [here](https://studio.zapper.xyz/docs/apis/getting-started) however we are asking all existing clients to migrate to the new Graph QL endpoints.

Please reach out to ops@zapper.xyz if you have any questions.

:::