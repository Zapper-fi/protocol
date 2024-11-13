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

## Get an API key

Visit the **[Dashboard](/dashboard)** to get your API key.

## Quickstart

Grab your API Key, store it in a safe location, and now you can use it to securely access the API. 

#### Curl Example
``` graphql
curl -G https://public.zapper.xyz/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{YOUR_API_KEY}}" \
  -d '{ "query":....

```

#### Apollo Example


``` graphql
not sure haha
```


## Buy credits

Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits, and these credits are deducted from your credit balance.

You can track your usage and purchase additional credits on the **[Dashboard](/dashboard)**

:::info

The Zapper Graph QL API is in private beta. If you run into any issues please share your feedback, it's much appreciated.

:::