import Layout from '@theme/Layout';
import { BuyCredits } from '@site/src/modules/Dashboard/BuyCredits';
import { Profile } from '@site/src/modules/Dashboard/Profile';
import { SignedIn } from '@site/src/modules/Dashboard/SignedIn';
import { SignedOut } from '@site/src/modules/Dashboard/SignedOut';
import { PaymentHistory } from '@site/src/modules/Dashboard/PaymentHistory';
import { ConsumptionStats } from '@site/src/modules/Dashboard/ConsumptionStats';
import { Breadcrumbs } from '@site/src/modules/Dashboard/Breadcrumbs';
import { QuickLinks } from '@site/src/components/QuickLinks';
import { Card } from '../components/Card';
import { useEffect } from 'react';
import { useSignIn } from '@site/src/helpers/useSignIn';

function Dashboard() {
  return (
    <Layout>
      <div className="flex w-full">
        <main className="w-full flex-1 overflow-hidden pb-16 pt-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs title="Dashboard" />

            <SignedOut>
              <SignInPrompt />
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h2>Your Dashboard</h2>
                </div>

                <div className="flex flex-col-reverse gap-4" style={{ width: '100%', flexFlow: 'wrap-reverse' }}>
                  <div className="flex flex-col gap-4" style={{ flex: 2, minWidth: '300px' }}>
                    <ConsumptionStats />
                    <PaymentHistory />
                  </div>
                  <Card className="w-full lg:w-96">
                    <div className="flex flex-col gap-8">
                      <Profile />
                      <BuyCredits />
                      <hr className="m-0" />
                      <QuickLinks />
                    </div>
                  </Card>
                </div>
              </div>
            </SignedIn>
          </div>
        </main>
      </div>
    </Layout>
  );
}

function SignInPrompt() {
  const { ready, login } = useSignIn();

  useEffect(() => {
    if (ready) {
      login();
    }
  }, [ready, login]);

  return null;
}

export default Dashboard;
