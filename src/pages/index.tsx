import Layout from '@theme/Layout';
import type React from 'react';
import { ApiSection } from '../modules/Api/ApiSection';
import { Interpretation } from '../modules/Interpretation/Interpretation';
import { Intro } from '../modules/Intro/Intro';
import { Metrics } from '../modules/Metrics';
import { Problem } from '../modules/Problem/Problem';
import { Recall } from '../modules/Recall/Recall';
import { Token } from '../modules/Token/Token';

const Home: React.FC = () => {
  return (
    <Layout>
      <Intro />
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        <Problem />
        <ApiSection />
        <Metrics />
        <Interpretation />
        <Token />
        <Recall />
      </div>
    </Layout>
  );
};

export default Home;
