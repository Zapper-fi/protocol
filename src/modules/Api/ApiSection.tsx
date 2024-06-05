import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";
import { Card } from "../../components/Card";

export const ApiSection: React.FC = () => {
	return (
		<div>
			<div style={{ display: "flex", gap: "32px" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						alignItems: "center",
						flex: 1,
					}}
				>
					<h1
						style={{
							flex: 1,
							fontWeight: "600",
							textAlign: "center",
						}}
					>
						The Ultimate Human-Readable API
					</h1>
					<h5
						style={{
							fontWeight: "400",
							textAlign: "center",
							maxWidth: "800px",
						}}
					>
						Access the most comprehensive onchain data built on top of our
						powerful interpretation stack. From DeFi portfolios, onchain prices
						to contextualized transaction histories.
					</h5>
				</div>
			</div>
			<Section
				className="border"
				style={{
					margin: "32px 0px",
				}}
			>
				<div
					style={{
						display: "flex",
						gap: "16px",
						overflowX: "scroll",
						width: "100%",
						maxWidth: "100%",
					}}
				>
					<Card
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
						}}
					>
						<img
							width="80px"
							height="80px"
							src="./img/RiDonutChartFill.png"
							alt="DeFi"
						/>
						<h3 style={{ marginBottom: "0px" }}>Portfolio Tracking</h3>
						<p>
							Track your DeFi positons, your NFT collections, lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod.
						</p>
					</Card>
					<Card
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
						}}
					>
						<img
							width="80px"
							height="80px"
							src="./img/RiDonutChartFill.png"
							alt="DeFi"
						/>
						<h3 style={{ marginBottom: "0px" }}>Account Timelines</h3>
						<p>
							Track your DeFi positons, your NFT collections, lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod.
						</p>
					</Card>
					<Card
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
						}}
					>
						<img
							width="80px"
							height="80px"
							src="./img/RiDonutChartFill.png"
							alt="DeFi"
						/>
						<h3 style={{ marginBottom: "0px" }}>Trending Actions</h3>
						<p>
							Track your DeFi positons, your NFT collections, lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod.
						</p>
					</Card>
					<Card
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
						}}
					>
						<img
							width="80px"
							height="80px"
							src="./img/RiDonutChartFill.png"
							alt="DeFi"
						/>
						<h3 style={{ marginBottom: "0px" }}>Popular Apps</h3>
						<p>
							Track your DeFi positons, your NFT collections, lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod.
						</p>
					</Card>
					<Card
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
						}}
					>
						<img
							width="80px"
							height="80px"
							src="./img/RiDonutChartFill.png"
							alt="DeFi"
						/>
						<h3 style={{ marginBottom: "0px" }}>App Feeds</h3>
						<p>
							Track your DeFi positons, your NFT collections, lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod.
						</p>
					</Card>
					<Card
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
						}}
					>
						<img
							width="80px"
							height="80px"
							src="./img/RiDonutChartFill.png"
							alt="DeFi"
						/>
						<h3 style={{ marginBottom: "0px" }}>Contract Labelling</h3>
						<p>
							Track your DeFi positons, your NFT collections, lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod.
						</p>
					</Card>
				</div>
			</Section>
		</div>
	);
};
