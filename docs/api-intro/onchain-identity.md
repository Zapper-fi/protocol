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

Let's say you are building a profile for users and want to surface some of the social aspects of an onchain identity. Here we will pass `addresses` for the user and return `displayName`, `ensRecord`, `description`,`farcasterProfile`, and `lensProfile`. Part of the response is below:


#### Example Query

```graphql
query Account($address: Address!) {
  account(address: $address) {
    address
    displayName {
      value
    }
    ensRecord {
      name
    }
  }
}
```

#### Example Variables

```json
{
  "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
}
```

#### Example Response

```json
{
  "data": {
    "account": {
      "address": "0x52c8ff44260056f896e20d8a43610dd88f05701b",
      "displayName": {
        "value": "0xjasper.eth"
      },
      "ensRecord": {
        "name": "0xjasper.eth"
      },
      "description": {
        "value": "designer of stuff at Zapper",
        "source": "ENS"
      },
      "farcasterProfile": {
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
| `address`      | Address to retrive data for.       | `String!` | 

</details>

<details>
<summary>Fields for account</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Returns the address that was queried for.   | `Address!` | 
| `avatar`      | Returns the avatar object, which contains avatar informatiom from multiple sources such as ENS, Farcaster, or Lens.      | `AccountAvatar!` | 
| `description`      | Returns a description along with the source from either ENS, Farcaster, or Lens.       | `Description!` | 
| `displayName`      | Returns a display name along with the source from either Zapper's Indexed Labels, ENS, Farcaster, or Lens.    | `DisplayName!` | 
| `ensRecord`      | Returns an ENS record associated with the address as well as its metadata.     | `EnsRecord!` | 
| `lensProfile`      | Returns a Lens profile associated with the address as well as its metadata.     | `LensProfile!` | 
| `farcasterProfile`      | Returns a Farcaster profile associated with the address as well as its metadata.     | `FarcasterProfile!` | 
| `label`      | Returns a label that has been indexed by Zapper. Useful for contracts.     | `String!` | 
| `socialLinks`      | Returns social links such as Warpcast or Hey.      | `AccountSocialLink!` | 
| `openenURI`      | Returns a Opepen URI       | `String!` | 
| `blockiesURI`      | Returns a Blockie URI        | `String!` | 
| `isFollowedBy`      | Takes an argument `address` and returns true/false       | `Boolean!` | 
| `followStats`      | Data on Zapper followers & following     | `FollowerStats!` | 
| `followers`      | Returns Zapper followers     | `FollowerConnection!` | 
| `following`      | Returns Zapper following     | `FollowingConnection!` | 
| `isContract`      | Returns true/false for whether this address is a contract.       | `Boolean!` | 
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
