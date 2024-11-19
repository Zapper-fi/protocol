---
sidebar_position: 10
sidebar_label: Pricing
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Pricing

The Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits, and these credits are deducted from the accounts credit balance.

---

### Buying Credits

Credits can be purchased onchain with any wallet. Payment is supported in over a hundred different tokens including ETH, MATIC, USDC, USDT, DAI, and much more. Once purchased, credits can be spent for API usage. 

The rate for purchasing credits is **$1 USD = 1,333 Credits**.


If you run out of credits and have used your 10,000 credit free tier, then you will need to purchase more credits in order to continue using the API.

Clients can track query usage and credits over time and purchase additional credits on the [Dashboard](/docs/api-intro/dashboard).

### Query Prices

All [Portfolio](/docs/api-intro/portfolio/claimables) related queries have a fixed cost of 4 credits. All other queries cost 2 credits.

| Queries | Credit Price |
| ----------- | ----------- |
| [`appBalances`](/docs/api-intro/portfolio/app-balances) | 4 | 
| [`nftBalances`](/docs/api-intro/portfolio/nft-balances) | 4 | 
| [`tokenBalances`](/docs/api-intro/portfolio/token-balances) | 4 | 
| [`claimables`](/docs/api-intro/portfolio/claimables) | 4 | 
| `totals` | 4 | 
| [`account`](/docs/api-intro/onchain-identity) | 2 | 
| [`accountsTimeline`](/docs/api-intro/human-readable-transactions) | 2 | 

:::info
When making a query, each address counts as 1 query, even if multiple addresses are bundled into 1 call.
:::

### Free Tier

All API clients can use up to 10,000 credits for free. This gives clients at least 2,500 queries without having to purchase credits and can be a great way to try the API.


Note that it is against the Zapper API [Terms of Service](https://zapper.xyz/docs/api-terms-of-use.pdf) to create multiple API keys with the goal of accumulating free credits.


<LinkButton href="/dashboard" type="primary" buttonCopy="Get Started" />

---

:::note
API calls are initially rate limited at **30 times per minute**. Please contact us at ops@zapper.xyz to increase your limit.
:::