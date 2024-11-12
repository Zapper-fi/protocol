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

Returns identity and other information relating to an address.

### Reference

<details>
<summary>Arguments for account</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Get data for address       | `String!` | 

</details>

<details>
<summary>Fields for account</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `id`      | -       | `ID!`       |
| `address`      | -       | `DisplayName!` | 
| `avatar`      | Gets avatar       | `AccountAvatar!` | 
| `description`      | Gets description.       | `Description!` | 
| `socialLinks`      | Gets social links.      | `AccountSocialLink!` | 
| `contract`      | -       | `String!` | 
| `metadata`      | -       | `AddressMetadataObject!` | 
| `isContract`      | -       | `Boolean!` | 
| `openenURI`      | Returns a Opepen URI       | `String!` | 
| `blockiesURI`      | Returns a Blockie URI        | `String!` | 
| `isFollowedBy`      | Takes an argument `address` and returns true/false       | `Boolean!` | 
| `followStats`      | Data on followers & following     | `FollowerStats!` | 
| `followers`      | Returns followers     | `FollowerConnection!` | 
| `following`      | Returns following     | `FollowingConnection!` | 
| `ensRecord`      | -     | `EnsRecord!` | 
| `lensProfile`      | -     | `LensProfile!` | 
| `farcasterProfile`      | -     | `FarcasterProfile!` | 
| `label`      | -     | `String!` | 

</details>

### `accounts`

Returns identity and other information for many addresses.

### Example Query

```graphql
query($addresses: [Address!]!) {
  accounts(addresses: $addresses) {
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

<details>
<summary>Arguments for accounts</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | Get data for one or more addresses      | `String!` | 

</details>

### Example Query

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

### Example Variables

```json
{
  "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
}
```

<Link to="/sandbox">
  <LinkButton href="/docs/api-intro/sandbox" type="primary" buttonCopy="Try in sandbox" />
</Link>