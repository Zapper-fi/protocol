import Layout from '@theme/Layout';
import React from 'react';
import { BuyCredits } from '../modules/Dashboard/BuyCredits';
import { Debug } from '../modules/Dashboard/Debug';
import { Profile } from '../modules/Dashboard/Profile';
import { SignInButton } from '../modules/Dashboard/SignInButton';
import { SignedIn } from '../modules/Dashboard/SignedIn';
import { SignedOut } from '../modules/Dashboard/SignedOut';
import { PaymentHistory } from '../modules/Dashboard/PaymentHistory';
import { Providers } from '../modules/Providers';
import { ConsumptionStats } from '../modules/Dashboard/ConsumptionStats';
import { Breadcrumbs } from '../modules/Dashboard/Breadcrumbs';

function Dashboard() {
  return (
    <Providers>
      <Layout>
        <div className="flex">
          <aside className="lg:w-[300px]">{/* Sidebar */}</aside>

          <main className="flex-1 py-4">
            <div className="container w-auto lg:mr-[25%]">
              <Breadcrumbs />

              <div className="flex justify-between">
                <h1>API Dashboard</h1>

                <SignInButton />
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
    </Providers>
  );
}

export default Dashboard;
