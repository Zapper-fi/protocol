import { gql, useMutation } from '@apollo/client';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@site/src/components/Button';
import { useAuthQuery } from '@site/src/helpers/useAuthQuery';
import { openPopup } from '@site/src/helpers/openPopup';
import { Card } from '@site/src/components/Card';

const QUERY = gql`
  query BuyCredits {
    apiClientById {
      apiV1PointsRemaining
      apiV2PointsRemaining
    }
  }
`;

const CREATE_CHARGE = gql`
	mutation CreateCharge($pointsAmount: Int!, $userId: String!, $userEmail: String!) {
		createCharge(pointsAmount: $pointsAmount, userId: $userId, userEmail: $userEmail) {
			hostedUrl
		}
	}
`;

export function BuyCredits() {
  const { user } = usePrivy();
  const { data } = useAuthQuery(QUERY);

  const [createCharge, { loading, error }] = useMutation(CREATE_CHARGE, {
    onCompleted: (data) => {
      if (data?.createCharge.hostedUrl) {
        const url = data.createCharge.hostedUrl;
        openPopup({ url });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const pointsAmount = Number(e.nativeEvent.submitter.value);

    createCharge({
      variables: {
        pointsAmount,
        userId: user.id,
        userEmail: user.email.address,
      },
    });
  };

  const { apiV2PointsRemaining = 0 } = data?.apiClientById || {};
  const disabled = loading || !user;

  return (
    <Card>
      <h3>Buy Credits</h3>

      <p>Current balance: {Number(apiV2PointsRemaining)}</p>

      {error && <p className="text-red-400">Error : {error.message}</p>}

      <form onSubmit={handleSubmit}>
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>API Credits</th>
              <th>Amount</th>
              <th>Purchase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">100</td>
              <td className="text-center">$10</td>
              <td className="text-center">
                <Button type="submit" variant="primary" value="100" disabled={disabled}>
                  Buy for $10
                </Button>
              </td>
            </tr>
            <tr>
              <td className="text-center">200</td>
              <td className="text-center">$20</td>
              <td className="text-center">
                <Button type="submit" variant="primary" value="200" disabled={disabled}>
                  Buy for $20
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </Card>
  );
}
