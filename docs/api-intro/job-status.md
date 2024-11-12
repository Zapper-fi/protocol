---
sidebar_position: 7
sidebar_label: Job Status
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Job Status

Returns the status of a specific `jobId`

---

### `balanceJobStatus`

Returns the status of a specific `jobId`

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

### Example Query

```graphql
query BalanceJobStatus($jobId: String!) {
  balanceJobStatus(jobId: $jobId) {
    jobId
    status
  }
}
```

### Example Variables

```json
{
  "jobId": "Insert the job ID returned by your balance compute mutation"
}
```

<Link to="/sandbox">
  <LinkButton href="/docs/api-intro/sandbox" type="primary" buttonCopy="Try in sandbox" />
</Link>
