---
sidebar_position: 7
---
import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';

export const jobIdQuery = `query BalanceJobStatus($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
    jobId
  }
}`;

export const jobIdVars = {
  "jobId": "Insert the job ID returned by your balance compute mutation"
};

---

### `balanceJobStatus`

Returns the status of a specific `jobId`

```sh
query Query($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
  }
```

### Sandbox

<ApolloSandboxComponent 
  query={jobIdQuery}
  variables={jobIdVars}
/>

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


