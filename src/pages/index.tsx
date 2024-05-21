import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Intro } from "../modules/Intro/Intro";

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`${siteConfig.title}`}
			description="Zapper Studio documentation."
		>
			<Intro />
		</Layout>
	);
}
