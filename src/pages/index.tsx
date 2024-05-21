import React from "react";
import Layout from "@theme/Layout";
import { Intro } from "../modules/Intro/Intro";

export default function Home(): JSX.Element {
	return (
		<Layout>
			<Intro />
		</Layout>
	);
}
