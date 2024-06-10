import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";

export const TrendingOnchainApps: React.FC = () => {
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
						height: "fit-content",
					}}
				>
					<h2
						style={{
							flex: 1,
							fontWeight: "600",
						}}
					>
						Trending{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Onchain Apps
						</span>
					</h2>
					<p className="text-alt-color">
						Track the most popular onchain apps and protocols on the network,
						based on onchain activity, volume and more. See the trending onchain
						actions in each app.
					</p>
					<p className="text-alt-color">
						Built on top of contract labelling and our event interpretation
						layer.
					</p>
				</div>
				<div style={{ flex: 1, textAlign: "center" }}>image</div>
			</div>
		</Section>
	);
};
