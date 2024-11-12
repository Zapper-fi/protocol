import Layout from '@theme/Layout';
import React from 'react';
import { BuyCredits } from '@site/src/modules/Dashboard/BuyCredits';
import { Debug } from '@site/src/modules/Dashboard/Debug';
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

        <main className="flex-1 py-4">
          <div className="container w-auto lg:mr-[25%]">
            <Breadcrumbs title="Dashboard" />

            <div className="flex justify-between">
              <h1>API Dashboard</h1>
            </div>

            <SignedOut>
              <p>Please log in or sign up to continue</p>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-8">
                <Profile />

                <ConsumptionStats />

                <BuyCredits />

                <PaymentHistory />

                <Debug />
              </div>
            </SignedIn>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;
