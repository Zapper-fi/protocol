---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Code Samples

Below are examples for working with the Zapper API across different languages and frameworks. Each example shows how to fetch portfolio data for provided addresses, across the chosen chains.

<Tabs>
  <TabItem value="react" label="React" default>
```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up Apollo Client
const httpLink = createHttpLink({
  uri: 'https://public.zapper.xyz/graphql',
});

const authLink = setContext((_, { headers }) => {
  const encodedKey = btoa('YOUR_API_KEY'); // Base64 encode your API key
  return {
    headers: {
      ...headers,
      authorization: `Basic ${encodedKey}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Example Query Component
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
  const { loading, error, data } = useQuery(PortfolioQuery, {
    variables: {
      addresses: ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
      networks: ["ETHEREUM_MAINNET"]
    },
  });
}
```
  </TabItem>
  <TabItem value="node" label="Node.js">
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

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
```
  </TabItem>
   <TabItem value="curl" label="cURL">
```bash
curl --location 'https://public.zapper.xyz/graphql' --header 'Content-Type: application/json' --header 'Authorization: YOUR_API_KEY_ENCODED --data '{"query":"query providerPorfolioQuery($addresses: [Address!]!, $networks: [Network!]!, $withOverrides: Boolean) { portfolio(addresses: $addresses, networks: $networks, withOverrides: $withOverrides) { tokenBalances { address network token { balance balanceUSD balanceRaw baseToken { name label symbol address } } } appBalances { address network updatedAt balanceUSD appName } nftBalances { balanceUSD network } } }","variables":{"addresses":["0x3d280fde2ddb59323c891cf30995e1862510342f","0x6f6e75fb472ee39d847d825cc7c9a613e227e261"],"networks":["BASE_MAINNET","ETHEREUM_MAINNET"]}}'
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests
import base64

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

def fetch_portfolio():
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
            }
        )
        return response.json()
    except Exception as e:
        print(f"Error: {e}")
```
  </TabItem>
  <TabItem value="ruby" label="Ruby">
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
  JSON.parse(response.body)
rescue StandardError => e
  puts "Error: #{e.message}"
end
```
  </TabItem>
</Tabs>

:::note
The API key must be Base64 encoded and passed with the `Basic` prefix in the Authorization Header.

Example: `Authorization: Basic YOUR_API_KEY_BASE_64==`

Header Key : "Authorization"

Header Value : "Basic YOUR_API_KEY_BASE_64=="
:::