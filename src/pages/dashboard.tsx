import Layout from '@theme/Layout';
import React from 'react';
import { BuyCredits } from '@site/src/modules/Dashboard/BuyCredits';
import { Profile } from '@site/src/modules/Dashboard/Profile';
import { SignedIn } from '@site/src/modules/Dashboard/SignedIn';
import { SignedOut } from '@site/src/modules/Dashboard/SignedOut';
import { PaymentHistory } from '@site/src/modules/Dashboard/PaymentHistory';
import { ConsumptionStats } from '@site/src/modules/Dashboard/ConsumptionStats';
import { Breadcrumbs } from '@site/src/modules/Dashboard/Breadcrumbs';

function Dashboard() {
  return (
    <Layout>
      <div className="flex">
        <aside className="lg:w-[300px]">{/* Sidebar */}</aside>

        <main className="flex-1 pt-4 pb-16">
          <div className="container mx-auto !pr-[25%]">
            <Breadcrumbs title="Dashboard" />

            <div className="flex justify-between">
              <h1>API Dashboard</h1>
            </div>

            <SignedOut>
              <p>Please sign in to continue.</p>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-8">
                <Profile />

                <ConsumptionStats />

                <BuyCredits />

                <PaymentHistory />
              </div>
            </SignedIn>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;
