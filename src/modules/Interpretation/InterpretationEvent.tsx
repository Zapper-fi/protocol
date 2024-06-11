import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";
import { Media } from "../../components/Media";

export const InterpretationEvent: React.FC = () => {
	return (
		<Section
			className="border"
			style={{ borderWidth: "1px", borderStyle: "solid", padding: "0px 32px" }}
		>
			<div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						width: "100%",
						height: "fit-content",
					}}
				>
					<h2
						style={{
							flex: 1,
							fontWeight: "600",
							whiteSpace: "nowrap",
						}}
					>
						Event{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Interpretation
						</span>
					</h2>
					<p className="text-alt-color">
						Event Interpreters are used on onchain transactions to translate
						them into human-readable output, and augment them with contextual,
						and often off-chain, information.
					</p>
					<ButtonGroup>
						<LinkButton
							href="/docs/interpretation/event-interpretation/guide/getting-started"
							buttonCopy="Get Started"
						/>
						<LinkButton
							href="/docs/interpretation/event-interpretation/overview"
							buttonCopy="Learn More"
							type="secondary"
						/>
					</ButtonGroup>
				</div>
				<div style={{ minWidth: "50%", textAlign: "center" }}>
					<Media
						src="./videos/Event_Light.mp4"
						darkSrc="./videos/Event_Dark.mp4"
						isVideo
						height="440px"
					/>
				</div>
			</div>
		</Section>
	);
};
