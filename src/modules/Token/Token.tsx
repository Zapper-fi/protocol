import { LinkButton } from "../../components/LinkButton";
import { Section } from "../../components/Section";
import React, { useState, useEffect } from "react";
import { ButtonGroup } from "../../components/ButtonGroup";
import { Media } from "../../components/Media";

export const Token: React.FC = () => {
	return (
		<Section
			className="border"
			style={{ borderWidth: "1px", borderStyle: "solid", padding: "64px 32px" }}
		>
			<div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						flex: 1,
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
								fontFamily: "monospace",
								fontSize: "38px",
							}}
						>
							$ZAP
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
						flex: 1,
						height: "360px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Media
						mixBlendMode="lighten"
						height="320px"
						isVideo
						src="./videos/zapper-token-light.mp4"
						darkSrc="./videos/zapper-token.mp4"
					/>
				</div>
			</div>
		</Section>
	);
};
