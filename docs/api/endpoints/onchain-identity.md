---
sidebar_position: 5
sidebar_label: Onchain Identity
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Onchain Identity

Enrich your app by surfacing onchain identity such as avatars, ENS, Farcaster, and more.


### `accounts`
Takes an array of `addresses` as input. Returns account information including:
* Display name and avatar
* ENS records
* Social profiles (Lens, Farcaster)
* Account metadata

### Example Use Case: Social Profile

Let's say you are building a profile for users and want to surface their identity primitives. Start by passing `addresses` for the user. Then return `displayName` and `description` with their sources as well as information from `ensRecord`, `farcasterProfile`, and `lensProfile`.

#### Example Variable

```js
{
  "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b"
}
```

#### Example Query

```graphql
query($addresses: [Address!]!) {
  accounts(addresses: $addresses) {
    displayName {
      source
      value
    }
    description {
      source
      value
    }
    ensRecord {
      name
    }
    farcasterProfile {
      username
      fid
    }
    lensProfile {
      handle
    }
  }
}
```

#### Example Response

```js
{
  "data": {
    "accounts": [
      {
        "displayName": {
          "source": "ENS",
          "value": "0xjasper.eth"
        },
        "description": {
          "source": "ENS",
          "value": "designer of stuff at Zapper"
        },
        "ensRecord": {
          "name": "0xjasper.eth"
        },
        "farcasterProfile": {
          "username": "jasper",
          "fid": 177
        },
        "lensProfile": {
          "handle": "0xjasper"
        }
      },
      {
        "displayName": {
          "source": "ENS",
          "value": "vitalik.eth"
        },
        "description": {
          "source": "LENS",
          "value": "Ethereum\n\nFable of the Dragon Tyrant (not mine but it's important): https://www.youtube.com/watch?v=cZYNADOHhVY\n\nAbolish daylight savings time and leap seconds"
        },
        "ensRecord": {
          "name": "vitalik.eth"
        },
        "farcasterProfile": {
          "username": "vitalik.eth",
          "fid": 5650
        },
        "lensProfile": {
          "handle": "vitalik"
        }
      }
    ]
  }
}

```

<SandboxButton/>

---


### Arguments

| Arguement      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The addresses being queried, as an array.       | `Address!` | 

### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Returns the address that was queried for.   | `Address!` | 
| `avatar`      | Returns the avatar object, which contains avatar informatiom from multiple sources such as ENS, Farcaster, Lens, or Zapper.      | `AccountAvatar!` | 
| `description`      | Returns a description along with the source from either ENS, Farcaster, or Lens.       | `Description!` | 
| `displayName`      | Returns a display name along with the source from either Zapper's indexed labels, ENS, Farcaster, or Lens.    | `DisplayName!` | 
| `ensRecord`      | Returns the ENS record associated with the address as well as its metadata.     | `EnsRecord!` | 
| `lensProfile`      | Returns the Lens profile associated with the address as well as its metadata.     | `LensProfile!` | 
| `farcasterProfile`      | Returns the Farcaster profile associated with the address as well as its metadata.     | `FarcasterProfile!` | 
| `label`      | Returns the label that has been indexed by Zapper, if any.     | `String!` | 
| `socialLinks`      | Returns links such as Website, Twitter, Github, Email, Warpcast, or Hey.      | `AccountSocialLink!` | 
| `openenURI`      | Returns a Opepen URI.      | `String!` | 
| `blockiesURI`      | Returns a Blockie URI.        | `String!` | 
| `isFollowedBy`      | Takes an argument `address` and returns true/false.       | `Boolean!` | 
| `followStats`      | Data on Zapper followers and following.     | `FollowerStats!` | 
| `followers`      | Returns Zapper followers.     | `FollowerConnection!` | 
| `following`      | Returns Zapper following.     | `FollowingConnection!` | 
| `isContract`      | Returns a true/false for whether this address is a contract.       | `Boolean!` | 
| `contract`      | -       | `String!` | 
| `id`      | -       | `ID!`       |

