# GraphQL Schema Reference

This schema provides access to on-chain data including portfolios, NFTs, tokens, and market data. Use this schema to craft GraphQL queries for accessing blockchain data through the API.

## Core Schema

```graphql
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