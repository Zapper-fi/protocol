import Layout from '@theme/Layout';
import React from 'react';
import { Providers } from '../modules/Providers';
import { SignInButton } from '../modules/Dashboard/SignInButton';
import { SignOutButton } from '../modules/Dashboard/SignOutButton';
import { SignedIn } from '../modules/Dashboard/SignedIn';
import { SignedOut } from '../modules/Dashboard/SignedOut';
import { BuyCredits } from '../modules/Dashboard/BuyCredits';
import { TransactionHistory } from '../modules/Dashboard/TransactionHistory';

function Dashboard() {
	return (
		<Providers>
			<Layout>
				<div className="flex">
					<aside className="w-[300px]">{/* Sidebar */}</aside>

					<main className="flex-1">
						<div className="container">
							<nav className="h-16">{/* Breadcrumbs */}</nav>

							<div className="flex justify-between">
								<h1>API Dashboard</h1>

								<SignedIn>
									<SignOutButton />
								</SignedIn>
							</div>

							<SignedOut>
								<p>Please log in or sign up to continue</p>

								<SignInButton />
							</SignedOut>

							<SignedIn>
								<BuyCredits />

								<TransactionHistory />
							</SignedIn>
						</div>
					</main>
				</div>
			</Layout>
		</Providers>
	);
}

export default Dashboard;
