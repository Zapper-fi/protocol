---
sidebar_position: 11
sidebar_label: Migration Checklist
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Zapper API Migration Guide: REST to GraphQL

[Dashboard](/dashboard).

:::note
API calls are initially rate limited at **30 requests per minute**. Please contact us at api@zapper.xyz to increase your limit.
:::


## Table of Contents
1. [Access and Payment Changes](#1-access-and-payment-changes)
   - [Existing API Client Checklist](#existing-api-client-checklist)
   - [New Payment System](#new-payment-system)
   - [Credit Management](#credit-management)
2. [Query Migration Guide](#2-query-migration-guide)
   - [Portfolio & Balance Queries](#portfolio--balance-queries)
   - [NFT Query Migration](#nft-query-migration)
   - [App Data Queries](#app-data-queries)
3. [Network Enumeration Changes](#3-network-enumeration-changes)
4. [Token Data Structure](#4-token-data-structure)
5. [Account System Changes](#5-account-system-changes)
6. [Best Practices](#6-best-practices)
   - [Field Selection](#field-selection)
   - [Pagination Implementation](#pagination-implementation)
   - [Error Handling](#error-handling)
7. [Performance Considerations](#7-performance-considerations)
8. [Testing Checklist](#8-testing-checklist)
9. [Deprecation Notes](#9-deprecation-notes)
10. [Documentation and Support](#10-documentation-and-support)

## 1. Access and Payment Changes

### Existing API Client Checklist

#### 1. Access Verification
- [ ] Visit [Get Started](/docs/api-intro/) to access the quickstart guide for the new GraphQL API
- [ ] Test your existing API key with a simple query
- [ ] Verify you can access the GraphQL [Sandbox](/docs/api-intro/sandbox) 

#### 2. Account Access
- [ ] Sign in to the new [Dashboard](/dashboard) with the email associated with your existing account 
- [ ] Contact api@zapper.xyz if you have issues signng in to your account
- [ ] Review and save your API key information

#### 3. Existing Credits
- [ ] Check your remaining REST API credits on the [Dashboard](/dashboard) 
- [ ] Email api@zapper.xyz to start transfering credits to the GraphQL queries.
- [ ] Confirm new credits appear on the [Dashboard](/dashboard) 

#### 4. Initial Testing
- [ ] Successfully make a test query
- [ ] Explore the new visualizations for query usage and cost on the [Dashboard](/dashboard) 
- [ ] Test response formats match expectations

#### 5. Documentation Review
- [ ] Read updated GraphQL [Docs](/docs/api-intro/)
- [ ] Save relevant example queries
- [ ] Note new endpoint structures

### New Payment System [Learn More](/docs/api-intro/pricing)
- $1 USD = 1,000 credits 
- Previous payment flow is discontinued
- All payments are now onchain
- Payment supported in 100+ tokens including:
  - ETH
  - MATIC
  - USDC
  - USDT
  - DAI

### Credit Management
- Automated email notifications at:
  - 7 days before estimated credit depletion
  - 3 days before estimated credit depletion
  - 1 day before estimated credit depletion
  - When credits are fully depleted
- Plan credit purchases based on usage patterns
- Test onchain payment flow with preferred token

## 2. Query Migration Guide

### Portfolio & Balance Queries

:::tip
You can now make a single `portfolio` query that includes the fields [`appBalances`](/docs/api-intro/portfolio/app-balances), [`nftBalances`](/docs/api-intro/portfolio/nft-balances), [`tokenBalances`](/docs/api-intro/portfolio/token-balances), [`claimables`](/docs/api-intro/portfolio/claimables), and [`totals`](/docs/api-intro/portfolio/portfolio-totals) for a the price of a single query. With the legacy API, you would have to make numerous seperate queries.
:::

### Batch Portfolio Fetching
```graphql
query GetCompletePortfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    appBalances { ... }
    tokenBalances { ... }
    nftBalances { ... }
    totals {
      total
      totalWithNFT
      totalByNetwork {
        network
        total
      }
    }
  }
}
```

#### v2/balances/apps → GraphQL
```graphql
query GetAppBalances($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    appBalances {
      appId
      appName
      network
      balanceUSD
      products {
        label
        assets {
          type
          address
          network
          balance
          balanceUSD
          price
          symbol
          decimals
        }
      }
    }
  }
}
```



#### v2/balances/tokens → GraphQL
```graphql
query GetTokenBalances($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    tokenBalances {
      network
      token {
        balance
        balanceUSD
        baseToken {
          symbol
          address
          network
          price
        }
      }
    }
  }
}
```

### NFT Query Migration

#### Net Worth Query
```graphql
query GetNFTNetWorth($addresses: [Address!]!) {
  nftNetWorth(addresses: $addresses)
}
```

#### User NFTs Query
```graphql
query GetUserNFTs($input: NftUsersTokensConnectionInput!) {
  nftUsersTokens(input: $input) {
    edges {
      node {
        tokenId
        collection {
          address
          name
          network
        }
        name
        estimatedValue {
          valueUsd
        }
      }
    }
  }
}
```

### App Data Queries
```graphql
query GetApp($appId: ID!) {
  app(id: $appId) {
    id
    slug
    displayName
    description
    url
    imgUrl
    groups: groupDefinitions {
      id
      label
      type
    }
    appTokenPositions {
      network
      address
      symbol
    }
  }
}
```

## 3. Network Enumeration Changes

### Update Network References
- Use the new `Network` enum. See [Supported Chains](/docs/api-intro/supported-chains) for all the enums.
  ```graphql
  enum Network {
    ETHEREUM_MAINNET
    POLYGON_MAINNET
    OPTIMISM_MAINNET
    BASE_MAINNET
    ARBITRUM_MAINNET
    ZKSYNC_MAINNET
    # etc.
  }
  ```


## 4. Token Data Structure
```graphql
query GetTokenData($address: Address!, $network: Network!) {
  fungibleToken(address: $address, network: $network) {
    address
    name
    symbol
    decimals
    onchainMarketData {
      price
      totalLiquidity
      marketCap
      priceChange24h
    }
  }
}
```

## 5. Account System Changes

### Breaking Changes
- Replace `User` type with new `Account` type
- Update ENS resolution pattern:
```graphql
query ResolveENS($addresses: [Address!]!) {
  accounts(addresses: $addresses) {
    address
    displayName {
      value
      source
    }
  }
}
```

## 6. Best Practices

### Field Selection
```graphql
# Use fragments for common patterns
fragment TokenFields on FungibleToken {
  address
  symbol
  decimals
  price
}
```

### Pagination Implementation
```graphql
query GetPaginatedData($first: Int!, $after: String) {
  nftUsersTokens(first: $first, after: $after) {
    edges {
      cursor
      node { ... }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Error Handling
- GraphQL returns errors alongside data:
```json
{
  "data": { ... },
  "errors": [
    {
      "message": "Error message",
      "path": ["field", "path"]
    }
  ]
}
```

## 7. Performance Considerations
- Review and optimize query depth
- Implement field selection to minimize response size
- Use batch queries where appropriate
- Review rate limiting requirements
- Implement proper caching strategies

## 8. Testing Checklist
- [ ] Test ENS resolution across networks
- [ ] Verify token balance accuracy
- [ ] Test NFT collection data
- [ ] Verify portfolio totals
- [ ] Test activity feed functionality
- [ ] Verify cross-chain data
- [ ] Test pagination implementation
- [ ] Verify error handling
- [ ] Test rate limiting compliance

## 9. Deprecation Notes
- Remove usage of deprecated fields and types
- Update to new naming conventions
- Replace legacy endpoints with GraphQL equivalents
- Update documentation references

## 10. Documentation and Support
- Update internal documentation
- Review new schema documentation
- Document new error handling procedures
- Update integration tests
- Document new features and capabilities

## Need Help?
If you have questions or need assistance with the migration, please:
1. Review the GraphQL schema documentation
2. Contact api@zapper.xyz for migration support
3. Join our Discord community for developer discussions