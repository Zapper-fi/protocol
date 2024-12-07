---
sidebar_position: 6
sidebar_label: Pricing
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Pricing

## Overview
The Zapper API uses a credit-based system where each API call consumes a specific number of credits from your balance. Our flexible pricing model allows you to purchase credits using various cryptocurrencies and offers volume-based discounts for larger purchases.

## Credit System Basics
- **Exchange Rate**: 1,000 Credits = $1 USD
- **Purchase Options**: Pay with ETH, MATIC, USDC, USDT, DAI, and 100+ other tokens
- **Free Tier**: 5,000 credits available to all new API clients
- **Credit Balance**: Monitor usage and purchase credits through your [Dashboard](/dashboard)

## Query Pricing Structure

### High-Value Queries (4 Credits)
| Query | Use Case | Description |
|-------|----------|-------------|
| `fungibleToken` | Single token data | Get comprehensive token data including market metrics and price history |
| `fungibleTokensByAddresses` | Multiple token data | Retrieve data for multiple tokens in one request |

### Portfolio Queries (3 Credits)
| Query | Features Included | Description |
|-------|------------------|-------------|
| `portfolio` | • App Balances<br>• NFT Balances<br>• Token Balances<br>• Claimables<br>• Portfolio Totals | Onchain portfolio's in a single query |

### Standard Queries (2 Credits)
| Category | Queries | Description |
|----------|---------|-------------|
| Transaction Data | • `timelineEvent`<br>• `timelineForApp`<br>• `accountsTimeline` | Human-readable transactions and activity |
| Identity & Social | • `accounts` | ENS, Farcaster, and Lens identity resolution |
| NFT Data | • `nftNetWorth`<br>• `nftUsersCollections`<br>• `nftUsersTokens`<br>• `nftToken`<br>• `nftCollections` | Comprehensive NFT portfolio analysis and valuations |

## Volume Discounts

| Tier | Credit Volume | Price per 1k Credits | Savings |
|------|---------------|---------------------|---------|
| Standard | 0-15M | $1.00 | - |
| Growth | 15M-50M | $0.80 | 20% |
| Enterprise | 50M+ | $0.70 | 30% |

### Volume Pricing Example
For a 60M credit purchase:
1. First 15M credits @ $1.00/1k = $15,000
2. Next 35M credits @ $0.80/1k = $28,000
3. Final 10M credits @ $0.70/1k = $7,000
Total cost: $50,000 (vs $60,000 at standard pricing)

## Important Notes

### Rate Limits
- Default: 30 requests per minute
- Need higher limits? Contact api@zapper.xyz

### Multi-Address Queries
- Cost = (Query Base Price) × (Number of Addresses)
- Example: Portfolio query for 3 addresses = 9 credits

### Getting Started
1. Access your free 5,000 credits
2. Test queries in our [Sandbox](/docs/api/sandbox) (doesn't consume credits)
3. Purchase additional credits through your [Dashboard](/dashboard)

<LinkButton href="/api" type="primary" buttonCopy="Get Started" />

:::warning Terms of Service
Creating multiple API keys to accumulate free credits violates our [Terms of Service](https://zapper.xyz/docs/api-terms-of-use.pdf).
:::
