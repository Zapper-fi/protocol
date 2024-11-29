---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Code Samples

Below are examples for working with the Zapper API across different languages and frameworks. Each example shows how to fetch portfolio data for provided addresses, across the chosen chains.

<Tabs>
  <TabItem value="react" label="React" default>

New to React? [Get started with Create React App](https://create-react-app.dev/docs/getting-started) or [Next.js](https://nextjs.org/docs/getting-started).

```typescript
import { ApolloClient, InMemoryCache, createHttpLink, gql, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Types for the GraphQL response
interface BaseToken {
  name: string;
  symbol: string;
}

interface Token {
  balance: string;
  balanceUSD: number;
  baseToken: BaseToken;
}

interface TokenBalance {
  address: string;
  network: string;
  token: Token;
}

interface PortfolioData {
  portfolio: {
    tokenBalances: TokenBalance[];
  };
}

// Set up Apollo Client
const httpLink = createHttpLink({
  uri: 'https://public.zapper.xyz/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'Basic YOUR_API_KEY'
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const PortfolioQuery = gql`
  query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!) {
    portfolio(addresses: $addresses, networks: $networks) {
      tokenBalances {
        address
        network
        token {
          balance
          balanceUSD
          baseToken {
            name
            symbol
          }
        }
      }
    }
  }
`;

function Portfolio() {
  const { loading, error, data } = useQuery<PortfolioData>(PortfolioQuery, {
    variables: {
      addresses: ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
      networks: ["ETHEREUM_MAINNET"]
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="p-4">
      {data.portfolio.tokenBalances.map((balance, index) => (
        <div key={`${balance.address}-${index}`} className="mb-4 p-4 border rounded">
          <p>Token: {balance.token.baseToken.name}</p>
          <p>Symbol: {balance.token.baseToken.symbol}</p>
          <p>Balance: {balance.token.balance}</p>
          <p>Value (USD): ${balance.token.balanceUSD.toFixed(2)}</p>
          <p>Network: {balance.network}</p>
        </div>
      ))}
    </div>
  );
}

export default Portfolio;
```
  </TabItem>
  <TabItem value="node" label="Node.js">

New to Node.js? [Get started with the official guide](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs).

```javascript
const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';

const query = `
  query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!) {
    portfolio(addresses: $addresses, networks: $networks) {
      tokenBalances {
        address
        network
        token {
          balance
          balanceUSD
          baseToken {
            name
            symbol
          }
        }
      }
    }
  }
`;

async function fetchPortfolio() {
  try {
    const response = await axios({
      url: 'https://public.zapper.xyz/graphql',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${API_KEY}`,
      },
      data: {
        query,
        variables: {
          addresses: ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
          networks: ["ETHEREUM_MAINNET"]
        }
      }
    });

    if (response.data.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(response.data.errors)}`);
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching portfolio:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const portfolio = await fetchPortfolio();
    console.log(JSON.stringify(portfolio, null, 2));
  } catch (error) {
    console.error('Failed to fetch portfolio:', error.message);
    process.exit(1);
  }
})();
```
  </TabItem>
  <TabItem value="curl" label="cURL">

cURL is usually pre-installed on Unix-based systems. For Windows, [download it here](https://curl.se/windows/).

```bash
# Encode your API key
API_KEY="YOUR_API_KEY"
ENCODED_KEY=$(echo -n $API_KEY | base64)
```

Then, run the cURL command using your encoded key : 
```bash
curl --location 'https://public.zapper.xyz/graphql' --header 'Content-Type: application/json' --header "Authorization: Basic $ENCODED_KEY" --data '{"query":"query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!) { portfolio(addresses: $addresses, networks: $networks) { tokenBalances { address network token { balance balanceUSD baseToken { name symbol } } } } }","variables":{"addresses":["0x3d280fde2ddb59323c891cf30995e1862510342f"],"networks":["ETHEREUM_MAINNET"]}}'
```

:::note
When using cURL, you need to Base64 encode your API key. Other languages handle this automatically.
:::

  </TabItem>
  <TabItem value="python" label="Python">

New to Python? [Get started with the official tutorial](https://docs.python.org/3/tutorial/).

```python
import requests
from typing import Dict, Any

API_KEY = 'YOUR_API_KEY'

query = """
query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!) {
  portfolio(addresses: $addresses, networks: $networks) {
    tokenBalances {
      address
      network
      token {
        balance
        balanceUSD
        baseToken {
          name
          symbol
        }
      }
    }
  }
}
"""

def fetch_portfolio() -> Dict[str, Any]:
    try:
        response = requests.post(
            'https://public.zapper.xyz/graphql',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Basic {API_KEY}'
            },
            json={
                'query': query,
                'variables': {
                    'addresses': ['0x3d280fde2ddb59323c891cf30995e1862510342f'],
                    'networks': ['ETHEREUM_MAINNET']
                }
            },
            timeout=30
        )
        
        response.raise_for_status()
        data = response.json()
        
        if 'errors' in data:
            raise ValueError(f"GraphQL Errors: {data['errors']}")
            
        return data['data']
        
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise
    except ValueError as e:
        print(f"Data validation failed: {e}")
        raise
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise

# Example usage
if __name__ == "__main__":
    try:
        portfolio_data = fetch_portfolio()
        print("Portfolio data:")
        for balance in portfolio_data['portfolio']['tokenBalances']:
            print(f"\nToken: {balance['token']['baseToken']['name']}")
            print(f"Symbol: {balance['token']['baseToken']['symbol']}")
            print(f"Balance: {balance['token']['balance']}")
            print(f"Value (USD): ${balance['token']['balanceUSD']}")
            print(f"Network: {balance['network']}")
    except Exception as e:
        print(f"Failed to fetch portfolio: {e}")
```
  </TabItem>
  <TabItem value="ruby" label="Ruby">

New to Ruby? [Get started with Ruby in 20 minutes](https://www.ruby-lang.org/en/documentation/quickstart/).

```ruby
require 'net/http'
require 'uri'
require 'json'

API_KEY = 'YOUR_API_KEY'

query = <<-GRAPHQL
  query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!) {
    portfolio(addresses: $addresses, networks: $networks) {
      tokenBalances {
        address
        network
        token {
          balance
          balanceUSD
          baseToken {
            name
            symbol
          }
        }
      }
    }
  }
GRAPHQL

def fetch_portfolio
  uri = URI('https://public.zapper.xyz/graphql')
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.read_timeout = 30
  http.open_timeout = 30

  request = Net::HTTP::Post.new(uri)
  request['Content-Type'] = 'application/json'
  request['Authorization'] = "Basic #{API_KEY}"
  request.body = {
    query: query,
    variables: {
      addresses: ['0x3d280fde2ddb59323c891cf30995e1862510342f'],
      networks: ['ETHEREUM_MAINNET']
    }
  }.to_json

  response = http.request(request)
  
  unless response.is_a?(Net::HTTPSuccess)
    raise "HTTP Request failed: #{response.code} - #{response.message}"
  end

  data = JSON.parse(response.body)
  
  if data['errors']
    raise "GraphQL Errors: #{data['errors']}"
  end

  data['data']
rescue JSON::ParserError => e
  raise "Failed to parse JSON response: #{e.message}"
rescue StandardError => e
  raise "Error fetching portfolio: #{e.message}"
end

# Example usage
begin
  portfolio = fetch_portfolio
  puts "Portfolio data:"
  portfolio['portfolio']['tokenBalances'].each do |balance|
    puts "\nToken: #{balance['token']['baseToken']['name']}"
    puts "Symbol: #{balance['token']['baseToken']['symbol']}"
    puts "Balance: #{balance['token']['balance']}"
    puts "Value (USD): $#{balance['token']['balanceUSD']}"
    puts "Network: #{balance['network']}"
  end
rescue StandardError => e
  puts "Failed to fetch portfolio: #{e.message}"
  exit 1
end
```
  </TabItem>
</Tabs>