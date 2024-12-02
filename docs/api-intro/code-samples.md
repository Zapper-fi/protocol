---
sidebar_position: 9
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Code Samples

Below are examples for working with the Zapper API across different languages and frameworks. Each example shows how to fetch portfolio data for provided addresses, across the chosen chains.

:::note
The API key must be base64 encoded for all requests.
:::

<Tabs>
  <TabItem value="react" label="React" default>

### Setup
1. Create new React project: `npx create-react-app my-app --template typescript`
2. Install dependencies: `npm install @apollo/client graphql`
3. Replace `src/App.tsx` with code below
4. Replace YOUR_API_KEY with your actual key
5. Run: `npm start`

New to React? [Get started with Create React App](https://create-react-app.dev/docs/getting-started) or [Next.js](https://nextjs.org/docs/getting-started).

```typescript
import { ApolloClient, InMemoryCache, createHttpLink, gql, useQuery, ApolloProvider } from '@apollo/client';
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

const API_KEY = 'YOUR_API_KEY';
const encodedKey = btoa(API_KEY);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Basic ${encodedKey}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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
      addresses: ['0x3d280fde2ddb59323c891cf30995e1862510342f'],
      networks: ['ETHEREUM_MAINNET'],
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Portfolio />
    </ApolloProvider>
  );
}

export default App;
```
  </TabItem>
  <TabItem value="node" label="Node.js">

### Setup
1. Create new directory and enter it
2. Run `npm init -y`
3. Install axios: `npm install axios`
4. Create `index.js` with code below
5. Replace YOUR_API_KEY
6. Run: `node index.js`

New to Node.js? [Get started with the official guide](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs).

```javascript
const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';
const encodedKey = Buffer.from(API_KEY).toString('base64');

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
        'Authorization': `Basic ${encodedKey}`,
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

  </TabItem>
  <TabItem value="python" label="Python">

### Setup
1. Create new directory: `mkdir python-portfolio && cd python-portfolio`
2. Create virtual environment: `python3 -m venv venv`
3. Activate virtual environment: `source venv/bin/activate`
4. Install requests: `pip install requests`
5. Create `portfolio.py` with code below
6. Replace YOUR_API_KEY
7. Run: `python portfolio.py`

New to Python? [Get started with the official tutorial](https://docs.python.org/3/tutorial/).

```python
import requests
import base64
from typing import Dict, Any

API_KEY = 'YOUR_API_KEY'
encoded_key = base64.b64encode(API_KEY.encode()).decode()

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
                'Authorization': f'Basic {encoded_key}'
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

### Setup
1. Install Ruby if not installed: `brew install ruby` (macOS) or follow [Ruby installation guide](https://www.ruby-lang.org/en/documentation/installation/)
2. Create new directory: `mkdir ruby-portfolio && cd ruby-portfolio`
3. Create `portfolio.rb` with code below
4. Replace YOUR_API_KEY
5. Run: `ruby portfolio.rb`

New to Ruby? [Get started with Ruby in 20 minutes](https://www.ruby-lang.org/en/documentation/quickstart/).

```ruby
require 'net/http'
require 'uri'
require 'json'
require 'base64'

API_KEY = 'YOUR_API_KEY'
encoded_key = Base64.strict_encode64(API_KEY)

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
  request['Authorization'] = "Basic #{encoded_key}"
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