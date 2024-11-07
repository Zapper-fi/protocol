---
sidebar_position: 7
---

---

### `balanceJobStatus`

Returns the status of a specific `jobId`

```sh
query Query($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
  }
```

**Apollo Sandbox Goes Here**


Arguments for `balanceJobStatus`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | -       | `String!` | 

Fields for `balanceJobStatus`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | -       | `String!`       |
| `status`      | -       | `String!` | 
