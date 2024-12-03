import React, { useEffect, useState } from 'react';

async function fetchSupportedChains() {
  try {
    const response = await fetch('https://zapper.xyz/api/networks');

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

function SupportedChainsTable() {
  const [supportedChains, setSupportedChains] = useState([]);

  useEffect(() => {
    const getSupportedChains = async () => {
      const chains = await fetchSupportedChains();
      setSupportedChains(chains);
    };

    getSupportedChains();
  }, []);

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
