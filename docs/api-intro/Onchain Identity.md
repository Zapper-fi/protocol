---
sidebar_position: 6
---

Description of the category of queries goes here. How it could be used in applications...etc.etc.

---

### `account`

Returns identity and other information relating to an address.

```sh
query($address: Address!) {
  account(address: $address) {
  }
}
```

Arguments for `account`

| Name      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Description goes here.       | `String!` | 

Fields for `account`

| Name      | Description | Type |
| ----------- | ----------- | ----------- |
| `id`      | Description goes here.       | `ID!`       |
| `address`      | Description goes here.       | `DisplayName!` | 
| `avatar`      | Description goes here.       | `AccountAvatar!` | 
| `description`      | Description goes here.       | `Description!` | 
| `socialLinks`      | Description goes here.       | `AccountSocialLink!` | 
| `contract`      | Description goes here.       | `String!` | 
| `metadata`      | Description goes here.       | `AddressMetadataObject!` | 
| `isContract`      | Balance in USD ex: `2810.08`      | `Boolean!` | 
| `openenURI`      | Returns a Opepen URI       | `String!` | 
| `blockiesURI`      | Returns a Blockie URI        | `String!` | 
| `isFollowedBy`      | Takes an argument `address` and returns true/false       | `Boolean!` | 
| `followStats`      | Data on followers & following     | `FollowerStats!` | 
| `followers`      | Returns followers     | `FollowerConnection!` | 
| `following`      | Returns following     | `FollowingConnection!` | 
| `ensRecord`      | Returns following     | `EnsRecord!` | 
| `lensProfile`      | Returns following     | `LensProfile!` | 
| `farcasterProfile`      | Returns following     | `FarcasterProfile!` | 
| `label`      | Returns following     | `String!` | 