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
          <th colSpan={2}>Chain</th>
          <th>Enum</th>
        </tr>
      </thead>
      <tbody>
        {supportedChains.map(({ iconUrl, name, enumValue }) => (
          <tr key={enumValue}>
            <td>
              <img src={iconUrl} alt={name} className="size-8 rounded-full" />
            </td>
            <td>{name}</td>
            <td>{enumValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupportedChainsTable;
