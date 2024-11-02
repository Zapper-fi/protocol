import Layout from '@theme/Layout';
import React from 'react';
import { AuthProvider } from '../modules/Dashboard/AuthProvider';
import { SignInButton } from '../modules/Dashboard/SignInButton';
import { SignOutButton } from '../modules/Dashboard/SignOutButton';
import { SignedIn } from '../modules/Dashboard/SignedIn';
import { SignedOut } from '../modules/Dashboard/SignedOut';

function Dashboard() {
	return (
		<AuthProvider>
			<Layout>
				<main>
					<h1>API Dashboard</h1>

					<SignedOut>
						<p>Please log in or sign up to continue</p>

						<SignInButton />
					</SignedOut>

					<SignedIn>
						<h2>Buy Credits</h2>
						<p>TODO: Buy credits goes here</p>

						<h2>Transaction History</h2>
						<p>TODO: Transaction history goes here</p>

						<SignOutButton />
					</SignedIn>
				</main>
			</Layout>
		</AuthProvider>
	);
}

export default Dashboard;
