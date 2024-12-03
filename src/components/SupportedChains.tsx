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
        {supportedChains.map(({ name, iconUrl }) => (
          <tr key={name}>
            <td>
              <img src={iconUrl} alt={name} className="size-16 rounded-full" />
            </td>
            <td>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupportedChainsTable;
