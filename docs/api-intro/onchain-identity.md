---
sidebar_position: 2
sidebar_label: Onchain Identity
---

import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';

export const accountsQuery = `query Account($address: Address!) {
  account(address: $address) {
    address
    displayName {
      value
    }
    ensRecord {
      name
    }
  }
}`;

export const accountsVariables = {
  "address": "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
};

# Onchain Identity

Enrich your app by surfacing onchain identity such as avatars, ENS, Farcaster, and more.

---

### `account`

Returns identity and other information relating to an address.


### Sandbox

<ApolloSandboxComponent 
  query={accountsQuery}
  variables={accountsVariables}
/>

### Reference

<details>
<summary>Arguments for account</summary>

| Arguement      | Description | Type |
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


```sh
query($addresses: [Address!]!) {
  accounts(addresses: $addresses) {
  }
  }
```

<details>
<summary>Arguments for accounts</summary>

| Arguement      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | Get data for one or more addresses      | `String!` | 

</details>

