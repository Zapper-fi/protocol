---
sidebar_position: 11
sidebar_label: Migration Checklist
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Migration Guide: REST to GraphQL

## 1. Access and Payment Changes

### Existing API Client Checklist

#### 1. Access Verification
- [ ] Sign in to the [Dashboard](/dashboard) with the same address you used for the REST API.
- [ ] Once signed in, you'll see your API key : it is the same as the REST API.
- [ ] Test your API key by querying any of the new endpoints at *public.zapper.xyz/graphql*. [See available endpoints](/docs/api/api).
- [ ] Contact api@zapper.xyz if you have issues signng in to your account.

#### 2. Existing Credits
- [ ] Check your remaining REST API credits in the [Dashboard](/dashboard). 
- [ ] Email api@zapper.xyz to transfer purchased credits to the GraphQL API.

#### 3. Initial Testing
- [ ] Explore the new visualizations for query usage and cost on the [Dashboard](/dashboard) 
- [ ] Test response formats match expectations

#### 4. Documentation Review
- [ ] Read updated GraphQL [Docs](/docs/api/)
- [ ] Save relevant example queries & note new endpoint structures

### New Payment System 
- $1 USD = 1,000 credits 
- Previous payment flow is discontinued
- All payments are now onchain through the [Dashboard](/dashboard)
- Payment supported in 100+ tokens including:
  - ETH
  - MATIC
  - USDC
  - USDT
  - DAI
- Review query [Pricing](/docs/api/pricing)
- Consider purchasing credits in bulk to take advantage of 20% and 30% cost savings

### Credit Management
- Automated email notifications at:
  - 7 days before estimated credit depletion
  - 3 days before estimated credit depletion
  - 1 day before estimated credit depletion
  - When credits are fully depleted
- Plan credit purchases based on usage patterns

## 2. Query Migration Guide

### Portfolio & Balance Queries

:::tip
You can now make a single `portfolio` query that includes the fields [`appBalances`](/docs/api/portfolio/app-balances), [`nftBalances`](/docs/api/portfolio/nft-balances), [`tokenBalances`](/docs/api/portfolio/token-balances), [`claimables`](/docs/api/portfolio/claimables), and [`totals`](/docs/api/portfolio/portfolio-totals) for the price of a single query. With the REST API, you would have to make many seperate queries.
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

## 3. Network Enum Changes

### Update Network References
- Use the new `Network` enum. See [Supported Chains](/docs/api/supported-chains) for all enum values.
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
- Use pagination when available

## 8. Deprecation Notes
- Remove usage of deprecated fields and types
- Update to new naming conventions
- Replace legacy endpoints with GraphQL equivalents
- Update documentation references

## 9. Documentation and Support
- Update internal documentation
- Review new schema documentation
- Document new error handling procedures
- Update integration tests
- Document new features and capabilities

## Need Help?
If you have questions or need assistance with the migration, please:
1. Review the GraphQL schema documentation
2. Contact api@zapper.xyz for migration support