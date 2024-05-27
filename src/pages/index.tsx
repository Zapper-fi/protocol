import React from "react";
import Layout from "@theme/Layout";
import { Intro } from "../modules/Intro/Intro";
import { Metrics } from "../modules/Intro/Metrics";

const Home: React.FC = () => {
	return (
		<Layout>
			<Intro />
			<div
				className="container"
				style={{ display: "flex", flexDirection: "column", gap: "32px" }}
			>
				<Metrics />
			</div>
		</Layout>
	);
};

export default Home;
