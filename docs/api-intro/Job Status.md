---
sidebar_position: 7
---
import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';

---

### `balanceJobStatus`

Returns the status of a specific `jobId`

```sh
query Query($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
  }
```

### Sandbox

<ApolloSandboxComponent />

### Reference

<details>
<summary>Arguments for balanceJobStatus</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | -       | `String!` | 

</details>

<details>
<summary>Fields for balanceJobStatus</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | -       | `String!`       |
| `status`      | -       | `String!` | 

</details>


