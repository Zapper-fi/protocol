---
sidebar_position: 2
sidebar_label: Onchain Identity
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Onchain Identity

Enrich your app by surfacing onchain identity such as avatars, ENS, Farcaster, and more.

---

### `account`

The `account` query takes an `address` and returns fields such as `displayName`, `ensRecord`, `farcasterProfile`, `lensProfile`, and other identity primitives.

### Example Use Case: Social Profile

Let's say you are building a profile for users and want to surface their identity primitives. Start by passing `addresses` for the user then return `displayName` and `description` with their sources as well as information from `ensRecord`, `farcasterProfile`, and `lensProfile`.

#### Example Variables

```json
{
  "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b"
}
```

#### Example Query

```graphql
query($address: Address!) {
  account(address: $address) {
    address
    displayName {
      value
      source
    }
    description {
      value
      source
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

```json
{
  "data": {
    "account": {
      "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b",
      "displayName": {
        "value": "0xjasper.eth",
        "source": "ENS"
      },
      "description": {
        "value": "designer of stuff at Zapper",
        "source": "ENS"
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
    }
  }
}

```

<LinkButton href="./sandbox" type="primary" buttonCopy="Try in sandbox" />

---

### Reference

<details>
<summary>Arguments for account</summary>

| Arguement      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Address to retrive.       | `String!` | 

</details>

<details>
<summary>Fields for account</summary>

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


</details>


### `accounts`

The `accounts` query takes 1 or more `addresses` and returns fields such as `displayName`, `ensRecord`, `farcasterProfile`, `lensProfile`, and other identity primitives.

<details>
<summary>Arguments for accounts</summary>

| Arguement      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | Addresses to retrive, inputted as an array.      | `String!` | 

</details>
