---
sidebar_position: 2
---

import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';


Surfaces various pieces of onchain identity for an address. Can be used to enhance the identity of users in your application.

---

### `account`

Returns identity and other information relating to an address.

```sh
query($address: Address!) {
  account(address: $address) {
  }
}
```

<ApolloSandboxComponent />

Arguments for `account`

| Arguement      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Get data for address       | `String!` | 

Fields for `account`

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

### `accounts`

Returns identity and other information for many addresses.

```sh
query($addresses: [Address!]!) {
  accounts(addresses: $addresses) {
  }
  }
```

Arguments for `accounts`

| Arguement      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | Get data for one or more addresses      | `String!` | 