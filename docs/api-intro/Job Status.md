---
sidebar_position: 7
---

Description of the category of queries goes here. How it could be used in applications...etc.etc.

---

### `balanceJobStatus`

Returns the status of a specific `jobId`

```sh
query Query($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
  }
```

Arguments for `balanceJobStatus`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | Description goes here.       | `String!` | 

Fields for `balanceJobStatus`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `jobId`      | Description goes here.       | `String!`       |
| `status`      | Description goes here.       | `String!` | 
