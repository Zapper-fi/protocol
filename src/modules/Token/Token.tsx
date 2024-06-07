import { LinkButton } from "../../components/LinkButton";
import { Section } from "../../components/Section";
import React from "react";
import { ButtonGroup } from "../../components/ButtonGroup";

export const Token: React.FC = () => {
	return (
		<Section
			className="border"
			style={{ borderWidth: "1px", borderStyle: "solid", padding: "32px" }}
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
							className="text-accent-color"
							style={{
								fontWeight: "500",
								fontSize: "18px",
								fontFamily: "monospace",
								wordSpacing: "-6px",
							}}
						>
							$ZAP TOKEN
						</div>
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
						Powering{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Incentives
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
					<video height="320px" controls={false} autoPlay={true} loop={true}>
						<source src="./img/videos/Zapper_Token.mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</Section>
	);
};
