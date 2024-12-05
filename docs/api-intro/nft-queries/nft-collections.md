---
sidebar_position: 1
sidebar_label: Collection Details
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Collection Details

Surfaces information about any ERC721 or ERC1155 NFT collection.

---

### `NftCollections`

The `NftCollections` query returns comprehensive information about NFT collections, including metadata, market data, traits, and events.

### Example Use Case: Collection Details

Query the NFT collection details by passing the collection address and network. This returns key information about the collection including metadata, pricing, and holder statistics.

#### Example Variables

```js
{
  "collections": [
    {
      "collectionAddress": "0xa449b4f43d9a33fcdcf397b9cc7aa909012709fd",
      "network": "BASE_MAINNET"
    }
  ]
}
```

#### Example Query

```graphql
query NftCollections($collections: [NftCollectionInput!]!) {
  nftCollections(collections: $collections) {
    name
    description
    network
    nftStandard
    supply
    holders {
      totalCount
    }
    floorPrice {
      valueUsd
    }
    topOfferPrice {
      valueUsd
    }
    medias {
      logo {
        url
      }
    }
    socialLinks {
      name
      url
    }
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftCollections": [
      {
        "name": "onchain gaias",
        "description": "https://warpcast.com/~/channel/ogs",
        "network": "BASE_MAINNET",
        "nftStandard": "ERC_721",
        "supply": "5222",
        "holders": {
          "totalCount": 2388
        },
        "floorPrice": {
          "valueUsd": 2421.565563951965
        },
        "topOfferPrice": {
          "valueUsd": 2271.5367039448
        },
        "medias": {
          "logo": {
            "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fbase%2F0xa449b4f43d9a33fcdcf397b9cc7aa909012709fd%2Flogo.png&checksum=a34b1"
          }
        },
        "socialLinks": [
          {
            "name": "opensea",
            "url": "https://opensea.io/collection/onchain-gaias"
          },
          {
            "name": "website",
            "url": "https://warpcast.com/~/channel/ogs"
          },
          {
            "name": "twitter",
            "url": "https://twitter.com/onchaingaias"
          }
        ]
      }
    ]
  }
}
```

<SandboxButton/>

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `collections` | Array of inputs specifying collection details | `[NftCollectionInput!]!` | Yes |

### NftCollectionInput

| Field | Description | Type | Required |
| ----- | ----------- | ---- | -------- |
| `collectionAddress` | The address of the NFT collection | `String!` | Yes |
| `network` | The network where the NFT exists | `Network!` | Yes |
| `subCollectionIdentifier` | Identifier for a sub-collection | `String` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier for the collection | `ID!` |
| `address` | Contract address of the collection | `Address!` |
| `subCollectionIdentifier` | Identifier for sub-collection | `String!` |
| `name` | Name of the collection | `String!` |
| `displayName` | Display name of the collection | `String` |
| `symbol` | Symbol/ticker of the collection | `String!` |
| `description` | Description of the collection | `String!` |
| `network` | Network where the collection exists | `Network!` |
| `socialLinks` | Array of social media links | `[SocialLink!]!` |
| `supply` | Total supply of the collection | `BigDecimal!` |
| `totalSupply` | Total supply including burned tokens | `BigDecimal!` |
| `floorPriceEth` | Floor price in ETH (deprecated) | `BigDecimal` |
| `floorPriceSourceMarketPlace` | Source marketplace for floor price | `NftDataSourceMarketplace` |
| `topOfferPriceEth` | Top offer in ETH (deprecated) | `BigDecimal` |
| `topOfferSourceMarketPlace` | Source marketplace for top offer | `NftDataSourceMarketplace` |
| `holdersCount` | Number of unique holders | `BigDecimal!` |
| `nftStandard` | Token standard | `NftStandard!` |
| `disabled` | Whether the collection is disabled | `Boolean!` |
| `type` | Type of collection | `NftCollectionType!` |
| `openseaId` | OpenSea identifier | `String` |
| `spamScore` | Spam score of the collection | `BigDecimal` |
| `floorPrice` | Current floor price | `NftValueDenomination` |
| `topOfferPrice` | Highest current offer | `NftValueDenomination` |
| `isApproved` | Check if collection is approved for a spender | `(spenderAddress: Address!, ownerAddress: Address!) => Boolean!` |
| `approvalTransaction` | Get transaction config for approval | `(spenderAddress: Address!, ownerAddress: Address!) => TransactionConfig!` |
| `revokeApprovalTransaction` | Get transaction config for revoking approval | `(spenderAddress: Address!, ownerAddress: Address!) => TransactionConfig!` |
| `nfts` | List of NFTs in the collection | `NftTokenConnection!` |
| `events` | Collection events (sales, transfers) | `CollectionEventConnection!` |
| `traitGroups` | Groups of traits for the collection | `[NftCollectionTraitGroupBase!]!` |
| `traitGroupValues` | Values for trait groups | `NftCollectionTraitValueConnection!` |
| `traits` | Collection traits | `[NftCollectionTraitType!]!` |
| `holders` | Collection holders | `PaginatedNftHolder!` |
| `medias` | Collection media assets | `NftCollectionMedias!` |
| `circulatingSupply` | Number of tokens in circulation | `BigDecimal!` |
| `totalCirculatingSupply` | Total circulating supply | `BigDecimal!` |
| `groups` | Collection groups information | `[NftCollectionGroup!]!` |
| `marketCap` | Market capitalization | `BigDecimal` |

### Type Definitions

```graphql
enum NftStandard {
  ERC_721
  ERC_1155
}

enum NftCollectionType {
  GENERAL
  BRIDGED
  BADGE
  POAP
  TICKET
  ACCOUNT_BOUND
  WRITING
  GAMING
  ART_BLOCKS
  BRAIN_DROPS
  LENS_PROFILE
  LENS_FOLLOW
  LENS_COLLECT
  ZORA_ERC721
  ZORA_ERC1155
  BLUEPRINT
}

enum NftDataSourceMarketplace {
  OPENSEA
  X2Y2
  LOOKSRARE
  RESERVOIR
  BLUR
}

enum NftPaymentStatsPeriod {
  Week
  Month
  Quarter
}

type TransactionConfig {
  data: String!
  to: Address!
  from: Address!
}

type NftValueDenomination {
  valueUsd: Float!
  valueWithDenomination: Float!
  denomination: NftDenomination!
}

type NftDenomination {
  network: String!
  address: String!
  symbol: String!
  imageUrl: String
}

type SocialLink {
  name: String!
  label: String!
  url: String!
  logoUrl: String!
}

type NftCollectionMedias {
  banner: Image
  card: Image
  logo: Image
}

input NftTokenConnectionOrderInput {
  orderBy: NftTokenSort!
  orderDirection: OrderDirectionOption = ASC
}

enum NftTokenSort {
  RARITY_RANK
  LAST_SALE_ETH
  ESTIMATED_VALUE_ETH
}

input NftTokenTraitInput {
  type: String!
  value: String!
}

input NftCollectionTraitValuesArgs {
  first: Int = 10
  after: String
  traitName: String!
  search: String
}
```

### Key Field Arguments

#### nfts
```graphql
nfts(
  first: Int = 25
  after: String
  tokenIds: [String!]
  owners: [Address!]
  traitIds: [String!]
  order: NftTokenConnectionOrderInput
  traits: [NftTokenTraitInput!]
): NftTokenConnection!
```

#### events
```graphql
events(
  first: Int! = 25
  after: String
  tokenIds: [String!]
  owners: [Address!]
  followedBy: Address
  traits: [NftTokenTraitInput!]
  period: NftPaymentStatsPeriod
): CollectionEventConnection!
```

#### holders
```graphql
holders(
  input: NftHolderConnectionInput
  first: Int
  after: String
): PaginatedNftHolder!
```

### Notes
- Provides real-time floor price data
- Supports both ERC721 and ERC1155 standards
- Includes social links and media assets
- Offers trait and holder information
- Tracks market data and collection events
- Supports collection approval management
- Returns paginated results for NFTs, events, and holders