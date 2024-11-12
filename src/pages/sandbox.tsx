import Layout from '@theme/Layout';
import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';
import { Breadcrumbs } from '@site/src/modules/Dashboard/Breadcrumbs';

function Sandbox() {
  return (
    <Layout>
      <main className="px-8 py-4">
        <Breadcrumbs title="Sandbox" />

        <h1>GraphQL Sandbox</h1>

        <p>
          Try out our GraphQL API endpoints directly in your browser. The sandbox is pre-configured with authentication
          and ready to use.
        </p>

        <ApolloSandboxComponent />
      </main>
    </Layout>
  );
}

export default Sandbox;
