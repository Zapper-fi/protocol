import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useAuthQuery } from '../helpers/useAuthQuery';

const QUERY = gql`
  query SupportedChains {
    networks {
      name
      enabled
    }
  }
`;

function SupportedChainsTable() {
  const { data } = useQuery(QUERY);

  const supportedChains = Object.values(data?.networks)
    .filter((n) => n.enabled)
    .map((n) => n.name);

  return (
    <table>
      <thead>
        <tr>
          <th>Chain</th>
        </tr>
      </thead>
      <tbody>
        {supportedChains.map((chain) => (
          <tr key={chain}>
            <td>{chain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupportedChainsTable;
