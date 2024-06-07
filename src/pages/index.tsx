import React from "react";
import Layout from "@theme/Layout";
import { Intro } from "../modules/Intro/Intro";
import { Metrics } from "../modules/Metrics";
import { Problem } from "../modules/Problem/Problem";
import { Interpretation } from "../modules/Interpretation/Interpretation";
import { ApiSection } from "../modules/Api/ApiSection";
import { Footer } from "../modules/Footer";
import { Token } from "../modules/Token/Token";

const Home: React.FC = () => {
	return (
		<Layout>
			<Intro />
			<div
				className="container"
				style={{ display: "flex", flexDirection: "column", gap: "64px" }}
			>
				<Problem />
				<ApiSection />
				<Interpretation />
				<Metrics />
				<Token />
			</div>
			<Footer />
		</Layout>
	);
};

export default Home;
