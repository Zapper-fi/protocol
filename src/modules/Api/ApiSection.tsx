import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";

export const ApiSection: React.FC = () => {
	return (
		<Section
			className="border"
			style={{
				borderWidth: "1px",
				borderStyle: "solid",
				padding: "32px",
				margin: "32px 0px",
			}}
		>
			<div style={{ display: "flex", gap: "32px" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						flex: 1,
					}}
				>
					<h2
						style={{
							flex: 1,
							fontWeight: "600",
						}}
					>
						The Ultimate Human-Readable API
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<ButtonGroup>
						<LinkButton href="/docs/api/intro" buttonCopy="Get Started" />
					</ButtonGroup>
				</div>
				<div style={{ flex: 1 }}>image goes here</div>
			</div>
		</Section>
	);
};
