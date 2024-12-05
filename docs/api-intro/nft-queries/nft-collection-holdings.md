---
sidebar_position: 4
sidebar_label: Collection Holdings
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Collection Holdings

Get information about NFT collections owned by specific wallet addresses.

---

### `nftUsersCollections`

The `nftUsersCollections` query takes an array of `owners` addresses and returns data about their NFT collections with support for various filtering options.

### Example Use Case: User's NFT Portfolio

Let's say you want to display all NFT collections owned by a user or group of users. Start by passing the `owners` addresses you want to query. Then return details about each collection including its `name`, `medias` for displaying images, and current `floorPrice`. You can filter results by `network` or minimum value, and use pagination with `first` and `after` arguments to load results in batches.

#### Example Variables

```js
{
  "owners": [
    "0x3d280fde2ddb59323c891cf30995e1862510342f", "0xc8f8e2f59dd95ff67c3d39109eca2e2a017d4c8a"],
  "network": "ETHEREUM_MAINNET",
  "first": 12
}
```

#### Example Query

```graphql
query($owners: [Address!]!, $network: Network, $first: Int) {
  nftUsersCollections(
    owners: $owners
    network: $network
    first: $first
  ) {
    edges {
      node {
        id
        name
        description
        network
        supply
        holdersCount
        floorPrice {
          valueUsd
          valueWithDenomination
          denomination {
            symbol
          }
        }
        medias {
          banner {
            url
          }
          logo {
            url
          }
        }
        socialLinks {
          name
          url
        }
        nftStandard
        type
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftUsersCollections": {
      "edges": [
        {
          "node": {
            "id": "TmZ0Q29sbGVjdGlvbi03NTQ5NDA=",
            "name": "Opepen Edition",
            "description": "This artwork may or may not be handmade.",
            "network": "ETHEREUM_MAINNET",
            "supply": "16000",
            "holdersCount": "3721",
            "floorPrice": {
              "valueUsd": 766.321752560448,
              "valueWithDenomination": 0.1984,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "medias": {
              "banner": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0x6339e5e072086621540d0362c4e3cea0d643e114%2Fbanner.svg&checksum=35506"
              },
              "logo": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0x6339e5e072086621540d0362c4e3cea0d643e114%2Flogo.png&checksum=0f7f6"
              }
            },
            "socialLinks": [
              {
                "name": "opensea",
                "url": "https://opensea.io/collection/opepen-edition"
              },
              {
                "name": "website",
                "url": "http://opepen.art"
              },
              {
                "name": "twitter",
                "url": "https://twitter.com/jackbutcher"
              }
            ],
            "nftStandard": "ERC_721",
            "type": "GENERAL"
          }
        },
        {
          "node": {
            "id": "TmZ0Q29sbGVjdGlvbi00MTMxOA==",
            "name": "CryptoPunks",
            "description": "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
            "network": "ETHEREUM_MAINNET",
            "supply": "10000",
            "holdersCount": "3861",
            "floorPrice": {
              "valueUsd": 171497.70971136808,
              "valueWithDenomination": 44.4006,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "medias": {
              "banner": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb%2Fbanner.png&checksum=0fade"
              },
              "logo": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb%2Flogo.png&checksum=cf0e4"
              }
            },
            "socialLinks": [
              {
                "name": "opensea",
                "url": "https://opensea.io/collection/cryptopunks"
              },
              {
                "name": "website",
                "url": "https://cryptopunks.app/"
              },
              {
                "name": "discord",
                "url": "https://discord.gg/tQp4pSE"
              },
              {
                "name": "twitter",
                "url": "https://twitter.com/cryptopunksnfts"
              }
            ],
            "nftStandard": "ERC_721",
            "type": "GENERAL"
          }
        },
        {
          "node": {
            "id": "TmZ0Q29sbGVjdGlvbi03ODkxNTY=",
            "name": "Checks - VV Originals",
            "description": "This artwork may or may not be notable.",
            "network": "ETHEREUM_MAINNET",
            "supply": "11023",
            "holdersCount": "1542",
            "floorPrice": {
              "valueUsd": 1324.84052988021,
              "valueWithDenomination": 0.343,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "medias": {
              "banner": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0x036721e5a769cc48b3189efbb9cce4471e8a48b1%2Fbanner.svg&checksum=d7d40"
              },
              "logo": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0x036721e5a769cc48b3189efbb9cce4471e8a48b1%2Flogo.png&checksum=5d8a6"
              }
            },
            "socialLinks": [
              {
                "name": "opensea",
                "url": "https://opensea.io/collection/vv-checks-originals"
              },
              {
                "name": "website",
                "url": "https://checks.art"
              },
              {
                "name": "twitter",
                "url": "https://twitter.com/jackbutcher"
              }
            ],
            "nftStandard": "ERC_721",
            "type": "GENERAL"
          }
        },
    }
  }
}
```

<SandboxButton/>

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `owners` | Array of addresses to query collections for | `[Address!]!` | Yes |
| `network` | Filter collections by specific network | `Network` | No |
| `minCollectionValueUsd` | Minimum USD value threshold for collections | `Float` | No |
| `search` | Search string to filter collections | `String` | No |
| `collectionIds` | Array of specific collection IDs to include | `[ID!]` | No |
| `standard` | Filter by NFT standard (ERC721/ERC1155) | `NftStandard` | No |
| `onlyHidden` | Show only hidden collections | `Boolean` | No |
| `first` | Number of collections to return (default: 24) | `Int` | No |
| `after` | Cursor for pagination | `String` | No |
| `withOverrides` | Include value overrides | `Boolean` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `edges` | Array of collection edges | `[NftUserCollectionEdge!]!` |
| `pageInfo` | Pagination information | `PageInfo!` |
| `node` | Collection information | `NftCollection!` |
| `cursor` | Pagination cursor | `String!` |


### Fields in NftUserCollectionConnection

| Field | Description | Type |
| ----- | ----------- | ---- |
| `edges` | Array of collection edges | `[NftUserCollectionEdge!]!` |
| `pageInfo` | Pagination information | `PageInfo!` |

### Fields in NftCollection (node)

| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier | `ID!` |
| `address` | Collection contract address | `Address!` |
| `subCollectionIdentifier` | Sub-collection identifier | `String!` |
| `name` | Collection name | `String!` |
| `displayName` | Display name | `String` |
| `symbol` | Collection symbol | `String!` |
| `description` | Collection description | `String!` |
| `network` | Blockchain network | `Network!` |
| `socialLinks` | Social media links | `[SocialLink!]!` |
| `supply` | Current supply | `BigDecimal!` |
| `totalSupply` | Total supply | `BigDecimal!` |
| `holdersCount` | Number of holders | `BigDecimal!` |
| `nftStandard` | NFT standard (ERC721/1155) | `NftStandard!` |
| `disabled` | Collection disabled status | `Boolean!` |
| `type` | Collection type | `NftCollectionType!` |
| `openseaId` | OpenSea identifier | `String` |
| `spamScore` | Spam risk score | `BigDecimal` |
| `floorPrice` | Current floor price | `NftValueDenomination` |
| `topOfferPrice` | Highest current offer | `NftValueDenomination` |
| `medias` | Collection media assets | `NftCollectionMedias!` |
| `circulatingSupply` | Circulating supply | `BigDecimal!` |
| `totalCirculatingSupply` | Total circulating supply | `BigDecimal!` |
| `marketCap` | Market capitalization | `BigDecimal` |
| `groups` | Collection groups | `[NftCollectionGroup!]!` |

### Field Arguments

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

#### traitGroupValues
```graphql
traitGroupValues(
  input: NftCollectionTraitValuesArgs!
): NftCollectionTraitValueConnection!
```

#### isApproved
```graphql
isApproved(
  spenderAddress: Address!
  ownerAddress: Address!
): Boolean!
```

#### approvalTransaction
```graphql
approvalTransaction(
  spenderAddress: Address!
  ownerAddress: Address!
): TransactionConfig!
```

#### revokeApprovalTransaction
```graphql
revokeApprovalTransaction(
  spenderAddress: Address!
  ownerAddress: Address!
): TransactionConfig!
```

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

enum NftPaymentStatsPeriod {
  Week
  Month
  Quarter
}

type NftCollectionMedias {
  banner: Image
  card: Image
  logo: Image
}

type TransactionConfig {
  data: String!
  to: Address!
  from: Address!
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

### Notes
- Supports pagination for handling large collections
- Can filter by network, value, and NFT standard
- Returns comprehensive collection metadata including floor prices and media
- Includes social links and collection statistics