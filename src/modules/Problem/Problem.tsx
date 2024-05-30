import { Section } from "../../components/Section";
import React from "react";

export const Problem: React.FC = () => {
	return (
		<Section>
			<div
				style={{
					display: "flex",
					gap: "40px",
					padding: "64px 64px",
					borderWidth: "4px",
					borderColor: "#fff",
					borderStyle: "double",
					alignItems: "center",
				}}
			>
				<div style={{ flex: 1 }}>
					<h2
						style={{
							flex: 1,
							fontFamily: "serif",
							fontSize: "44px",
							fontWeight: "600",
						}}
					>
						Onchain information is disorganized and unreadable.
					</h2>
				</div>
				<div style={{ flex: 1 }}>
					<h4 style={{ fontWeight: "normal", lineHeight: "28px" }}>
						Amount of onchain applications is increasing exponentially - no
						centralized entity will be able to organize everything.
					</h4>
					<h4 style={{ fontWeight: "normal", lineHeight: "28px" }}>
						Blockchains are bustling digital downtowns containing rich economic
						opportunities, yet are very difficult to navigate.
					</h4>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					gap: "32px",
					padding: "64px 0px",
					alignItems: "center",
					width: "100%",
					flexDirection: "column",
				}}
			>
				<h2
					style={{
						fontSize: "40px",
						textAlign: "center",
						fontStyle: "italic",
					}}
				>
					Readable onchain information is <b>important</b>.
				</h2>
				<div
					style={{
						display: "flex",
						gap: "16px",
						overflowX: "scroll",
						width: "100%",
						maxWidth: "100%",
					}}
				>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",

							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
					<div
						style={{
							display: "flex",
							gap: "16px",
							flexDirection: "column",
							width: "340px",
							minWidth: "340px",
							backgroundColor: "black",
							padding: "32px",
							borderRadius: "16px",
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
					</div>
				</div>
			</div>
		</Section>
	);
};
