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

<ApolloSandboxComponent />


Arguments for `balanceJobStatus`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | -       | `String!` | 

Fields for `balanceJobStatus`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | -       | `String!`       |
| `status`      | -       | `String!` | 
