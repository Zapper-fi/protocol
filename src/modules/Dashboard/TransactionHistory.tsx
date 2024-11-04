import { useQuery, gql } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';

const QUERY = gql`
  query GetApiClient($privyId: String!) {
    apiClient(privyId: $privyId) {
      totalPointsRemaining
      apiKey
      payments {
        amount
        creditsPurchased
        createdAt
        status
      }
    }
  }
`;

export function TransactionHistory() {
	const { user } = usePrivy();
	const { loading, error, data } = useQuery(QUERY, {
		variables: { privyId: user.id },
	});

	const { payments } = data?.apiClient || {};

	return (
		<div className="mb-8">
			<h2>Transaction History</h2>

			{loading && <p>Loading...</p>}

			{error && <p className="text-red-400">Error : {error.message}</p>}

			{!loading && !error && !payments ? (
				<p>No data found</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Amount</th>
							<th>Credits Purchased</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{payments?.length === 0 ? (
							<tr>
								<td colSpan={4} className="text-center">
									No purchases found
								</td>
							</tr>
						) : (
							payments?.map((payment) => (
								<tr key={payment.createdAt}>
									<td>{payment.createdAt}</td>
									<td>{payment.amount}</td>
									<td>{payment.creditsPurchased}</td>
									<td>{payment.status}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			)}
		</div>
	);
}
