import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";
import { Media } from "../../components/Media";

export const InterpretationAppToken: React.FC = () => {
	return (
		<Section
			className="border"
			style={{
				borderWidth: "1px",
				borderStyle: "solid",
				padding: "16px 32px",
				marginTop: "64px",
			}}
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
							fontWeight: "600",
							whiteSpace: "nowrap",
						}}
					>
						Position{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Interpretation
						</span>
					</h2>
					<p className="text-alt-color">
						App Token Interpreters are used to index app-centric token balances
						for users. This can be loans, deposits, amount staked, etc... The
						large majority of these tokens do not have a market price; rather,
						they have a redeemable price to unlock an underlying token.
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
				<div style={{ minWidth: "50%", textAlign: "center" }}>
					<Media
						src="./videos/Position_Dark.mp4"
						darkSrc="./videos/Position_Dark.mp4"
						isVideo
						height="440px"
					/>
				</div>
			</div>
		</Section>
	);
};
