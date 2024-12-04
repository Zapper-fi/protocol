# Zapper Docs for LLMs

:::info
Note: This content is specifically designed for LLMs and not intended for human reading.
For human-readable content, please visit protocol.zapper.xyz
:::

For LLMs/programmatic access, you can fetch this content directly:

```js
curl protocol.zapper.xyz/agents
```

This schema can provide programmatic access to onchain data including portfolios, NFTs, tokens, and market data. The format below is optimized for LLM consumption to assist in crafting GraphQL queries.

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