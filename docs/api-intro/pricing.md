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

The rate for purchasing credits is $1 USD = 1,333 Credits.


If you run out of credits, and you have used your 10,000 free tier credits, then you will need to purchase additional credits in order to continue querying the API.

Clients can track query usage and credits over time and purchase additional credits on the [Dashboard](/dashboard).

### Query Prices

All portfolio related queries such as token, NFT, or app balaces, as well as totals such as claimables have a fixed cost of 4 credits. All other queries cost 2 credits.

| Queries | Credit Price |
| ----------- | ----------- |
| `appBalances` | 4 | 
| `nftBalances` | 4 | 
| `tokenBalances` | 4 | 
| `claimables` | 4 | 
| `totals` | 4 | 
| `account` | 2 | 
| `accountsTimeline` | 2 | 

:::info
When making a query, each address counts as 1 query, even if multiple addresses are bundled into 1 call.
:::

### Free Tier

All API clients can use up to 10,000 credits for free. This gives clients at least 2,500 queries without having to purchase credits and can be a great way to test various endpoints.


Note that it is against the Zapper API [Terms of Service](https://zapper.xyz/docs/api-terms-of-use.pdf) to create multiple API Keys with the goal of accumulating free credits.


<LinkButton href="./dashboard" type="primary" buttonCopy="Get Started" />


### Discounts for Credit Purchases

After the alpha concludes, discounts will be offered for purchasing larger amounts of credits. There will be more information provided on this soon.

:::note
API calls are initially rate limited at **30 times per minute**. Please contact us at ops@zapper.xyz to increase your limit.
:::