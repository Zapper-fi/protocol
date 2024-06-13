import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";
import { Media } from "../../components/Media";

export const InterpretationAppToken: React.FC = () => {
	return (
		<Section
			style={{
				padding: "16px 32px",
				marginTop: "128px",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: "64px",
					alignItems: "center",
					flexWrap: "wrap",
					position: "relative",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						width: "500px",
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
						for users. This can be loans, deposits, staked amounts, etc... The
						majority of these tokens do not have a market price; rather,
						they are priced based on the tokens they are redeemable for.
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
				<div
					className="border"
					style={{
						textAlign: "center",
						borderStyle: "solid",
						borderWidth: "1px",
						borderRadius: "16px",
						overflow: "hidden",
						display: "flex",
						justifyContent: "center",
						flex: 1,
						minWidth: "50%",
						maxWidth: "800px",
					}}
				>
					{" "}
					<Media
						src="./videos/Position_Light.mp4"
						darkSrc="./videos/Position_Dark.mp4"
						isVideo
						height="440px"
					/>
				</div>
			</div>
		</Section>
	);
};
