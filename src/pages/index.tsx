import type React from 'react';
import Layout from '@theme/Layout';
import { Intro } from '../modules/Intro/Intro';
import { Metrics } from '../modules/Metrics';
import { Problem } from '../modules/Problem/Problem';
import { Interpretation } from '../modules/Interpretation/Interpretation';
import { ApiSection } from '../modules/Api/ApiSection';
import { Token } from '../modules/Token/Token';
import { Recall } from '../modules/Recall/Recall';

const Home: React.FC = () => {
	return (
		<Layout>
			<Intro />
			<div
				className="container"
				style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}
			>
				<Problem />
				<ApiSection />
				<Interpretation />
				<Metrics />
				<Token />
				<Recall />
			</div>
		</Layout>
	);
};

export default Home;
