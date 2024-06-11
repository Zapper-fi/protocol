import { LinkButton } from "../../components/LinkButton";
import { Section } from "../../components/Section";
import React from "react";
import { ButtonGroup } from "../../components/ButtonGroup";
import { Media } from "../../components/Media";

export const Token: React.FC = () => {
	return (
		<Section className="border" style={{ padding: "64px 32px" }}>
			<div
				style={{
					display: "flex",
					gap: "16px",
					alignItems: "center",
					flexWrap: "wrap-reverse",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						width: "500px",
					}}
				>
					<div
						style={{
							display: "flex",
							gap: "12px",
							flex: 1,
							alignItems: "center",
						}}
					>
						<div
							className="text-alt-color"
							style={{
								fontWeight: "500",
								fontSize: "12px",
								alignItems: "center",
								display: "flex",
								textTransform: "uppercase",
							}}
						>
							Coming Q4
						</div>
					</div>

					<h2
						style={{
							flex: 1,
							fontWeight: "600",
						}}
					>
						Powered by{" "}
						<span
							className="text-accent-color"
							style={{
								fontWeight: 600,
							}}
						>
							<span style={{ opacity: "0.6", fontSize: "28px" }}>$</span>ZAP
						</span>
					</h2>
					<p className="text-alt-color">
						The ZAP token is central to the protocol 一 serving as an incentive
						to interpret onchain information, and as a payment for accessing its
						data.
					</p>
					<ButtonGroup>
						<LinkButton href="/docs/litepaper" buttonCopy="Read Litepaper" />
					</ButtonGroup>
				</div>
				<div
					style={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
						flex: 1,
					}}
				>
					<div
						style={{
							minWidth: "320px",
							maxWidth: "420px",
						}}
					>
						<Media
							mixBlendMode="lighten"
							isVideo
							src="./videos/zapper-token-light.mp4"
							darkSrc="./videos/zapper-token.mp4"
						/>
					</div>
				</div>
			</div>
		</Section>
	);
};
