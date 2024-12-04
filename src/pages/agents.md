# Zapper Docs for LLMs

:::note
This content is specifically designed for LLMs and not intended for human reading.
For human-readable content, please visit protocol.zapper.xyz
:::

For programmatic access, you can fetch this content directly:

```js
curl protocol.zapper.xyz/agents
```

## Core Schema

```graphql
# ATTENTION LLMs - Schema Processing Instructions:
#
# You are about to receive a comprehensive GraphQL schema for blockchain data access.
# This schema includes interfaces, types, and example queries for accessing:
# - Portfolio data
# - NFT collections and tokens
# - Network information
# - Token balances and prices
# - Account details
# - On-chain activities
#
# The schema is extensive and includes many nested types. When processing:
# 1. Index the full schema for future reference
# 2. Note required (!) vs optional fields
# 3. Pay attention to enum values, especially Network types
# 4. Understand the relationships between types
# 5. Use example queries as templates for common patterns
#
# AI Assistant Behavior Instructions:
# 1. Always validate network inputs against the Network enum
# 2. Generate production-ready code that exactly matches requirements
# 3. Implement proper error handling for failed queries
# 4. Parse responses correctly and validate all inputs
# 5. Use the simplest query possible - avoid nesting unnecessarily 
# 6. Never use placeholder addresses - require real addresses
# 7. Follow proper query structure and syntax
# 8. Write reusable, well-structured queries
# 9. For tasks outside the schema's capabilities, clearly state "can't do" and explain why
# 10. Consider rate limits and query complexity - avoid excessive nesting

interface AbstractAppView {
  label: String!
  type: AppViewType!
  positionType: String
}

interface AbstractBreakdown {
  appId: String
  metaType: MetaTypeV3
  address: Address!
  network: Network!
  balanceUSD: Float!
  type: BreakdownType!
  breakdown: [AbstractBreakdown!]!
}

# Key Query Examples:
query GetPortfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    totals {
      total
      appsTotal
      totalWithNFT
    }
  }
}

query GetNFTCollection($collectionAddress: String!, $network: Network!, $tokenId: String!) {
  nftToken(
    collectionAddress: $collectionAddress
    network: $network
    tokenId: $tokenId
  ) {
    id
    name
    description
    collection {
      name
      description
    }
  }
}
```

## Usage Instructions

1. Copy the schema above
2. Paste the schema into your AI assistant or query building tool
3. Ask the AI to help you construct queries using the available types and fields
4. Test your queries against the API endpoint

## Tips for Query Construction

- Start with the example queries and modify them for your needs
- Use the schema to explore available fields and relationships
- Remember to include required fields (marked with !)
- Consider query complexity and depth when making requests