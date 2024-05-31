import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";

export const InterpretationAppToken: React.FC = () => {
	return (
		<Section
			className="border"
			style={{ borderWidth: "1px", borderStyle: "solid", padding: "32px" }}
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
						App Token Interpreters
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
					<ButtonGroup>
						<LinkButton
							href="/docs/interpretation/app-token-interpretation/guide"
							buttonCopy="Get Started"
						/>
						<LinkButton
							href="/docs/interpretation/app-token-interpretation/overview"
							buttonCopy="Learn More"
							type="secondary"
						/>
					</ButtonGroup>
				</div>
				<div style={{ flex: 1 }}>image goes here</div>
			</div>
		</Section>
	);
};
