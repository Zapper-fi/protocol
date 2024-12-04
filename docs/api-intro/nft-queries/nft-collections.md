---
sidebar_position: 1
sidebar_label: Collections
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Collections

Surfaces information about any ERC721 or ERC1155 NFT collection.

---

### `NftCollections`

The `NftCollections` query takes a required `address` and `network`. It returns fields such as `name`, `nftStandard`, `supply`, `floorPrice`, `medias` and other information useful for NFT Collections.

### Example Use Case: Collection Details

Let's say you want to surface some important details about a specific NFT collection. Start by passing `address` for the collection address and `network` for the chain where the NFTs exist. Then return details such as `name`, `nftStandard`, `floorprice`,`topOfferPrice`, as well as the `medias` object to return the `url` for the collection `logo`.

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

```
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

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `collections` | Array of inputs specifying `collectionAddress` and `network`. | `[NftCollectionInput!]!` |
| `collectionAddress`      | The address of the NFT collection.        | `String!` | 
| `network`      | The network where the NFT exists.    | `Network!` | 

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier for the collection | `ID!` |
| `address` | Contract address of the collection | `Address!` |
| `name` | Name of the collection | `String!` |
| `symbol` | Symbol/ticker of the collection | `String!` |
| `description` | Description of the collection | `String!` |
| `network` | Network where the collection exists | `Network!` |
| `socialLinks` | Array of social media links | `[SocialLink!]!` |
| `supply` | Total supply of the collection | `BigDecimal!` |
| `holdersCount` | Number of unique holders | `BigDecimal!` |
| `floorPrice` | Current floor price with USD and native token values | `NftValueDenomination` |
| `topOfferPrice` | Highest current offer with USD and native token values | `NftValueDenomination` |
| `nftStandard` | Token standard (ERC721 or ERC1155) | `NftStandard!` |
| `type` | Type of collection (GENERAL, BADGE, etc.) | `NftCollectionType!` |
| `medias` | Collection media assets (banner, logo, etc.) | `NftCollectionMedias!` |
| `traitGroups` | Groups of traits for the collection | `[NftCollectionTraitGroupBase!]!` |
| `disabled` | Whether the collection is disabled | `Boolean!` |
| `circulatingSupply` | Number of tokens in circulation | `BigDecimal!` |
| `marketCap` | Market capitalization of the collection | `BigDecimal` |
