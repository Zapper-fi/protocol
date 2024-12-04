---
sidebar_position: 1
sidebar_label: Collections
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Collections

Surfaces balances that a user might hold inside of an onchain application.

---

### `NftCollections`

The `NftCollections` query takes a required `address` and `network`. It returns fields such as `name`, `nftStandard`, `supply`, `floorPrice`, `medias` and other information useful for NFT Collections.

### Example Use Case: Collection Details

Let's say you want to surface some important details about a specific NFT collection. Start by passing `address` for the collection address and `network` for the chain where the NFTs exist. We will return a few important details like `name`, `nftStandard`, `floorprice`,`topOfferPrice`, as well as the `medias` object to return the `url` for the collection `logo`.

#### Example Variables

```js
{
  "collections": [
    {
      "collectionAddress": "0x7533e410ed2780807488b0068399788b2932b4e1",
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
    network
    nftStandard
    supply
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
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftCollections": [
      {
        "name": "dGEN1",
        "network": "BASE_MAINNET",
        "nftStandard": "ERC_721",
        "supply": "4875",
        "floorPrice": {
          "valueUsd": 434.1226573032
        },
        "topOfferPrice": {
          "valueUsd": 394.32808038374
        },
        "medias": {
          "logo": {
            "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2Fe4d8820677ebcf1d78d9b524baa106053ff77673b0a6626a91bdd61b6a22a2ab.png&checksum=d952f"
          }
        }
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
