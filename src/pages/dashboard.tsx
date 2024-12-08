import Layout from '@theme/Layout';
import React from 'react';
import { BuyCredits } from '@site/src/modules/Dashboard/BuyCredits';
import { Profile } from '@site/src/modules/Dashboard/Profile';
import { SignedIn } from '@site/src/modules/Dashboard/SignedIn';
import { SignedOut } from '@site/src/modules/Dashboard/SignedOut';
import { PaymentHistory } from '@site/src/modules/Dashboard/PaymentHistory';
import { ConsumptionStats } from '@site/src/modules/Dashboard/ConsumptionStats';
import { Breadcrumbs } from '@site/src/modules/Dashboard/Breadcrumbs';
import { QuickLinks } from '@site/src/components/QuickLinks';
import { Card } from '../components/Card';

function Dashboard() {
  return (
    <Layout>
      <div className="flex">
        <main className="flex-1 pt-4 pb-16">
          <div className="container mx-auto ">
            <Breadcrumbs title="Dashboard" />

            <SignedOut>
              <p>Please sign in to continue.</p>
            </SignedOut>

            <SignedIn>
              <div className="flex gap-4 " style={{ width: '100%', flexFlow: 'wrap' }}>
                <div className="flex flex-col gap-4" style={{ flex: 2 }}>
                  <div className="flex justify-between">
                    <h2>Welcome to Your Dashboard</h2>
                  </div>
                  <ConsumptionStats />
                  <PaymentHistory />
                </div>
                <Card style={{ minWidth: '400px', flex: 1 }}>
                  <div className="flex flex-col gap-8">
                    <Profile />
                    <BuyCredits />
                    <QuickLinks />
                  </div>
                </Card>
              </div>
            </SignedIn>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;
