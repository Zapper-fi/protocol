import React from "react";
import { Section } from "../../components/Section";
import { ButtonGroup } from "../../components/ButtonGroup";
import { LinkButton } from "../../components/LinkButton";
import { Card } from "../../components/Card";

export const ApiSection: React.FC = () => {
	return (
		<div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						gap: "32px",
						width: "100%",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div
						style={{
							fontSize: "12px",
							textTransform: "uppercase",
							borderStyle: "solid",
							borderWidth: "1px",
							padding: "8px 24px",
							borderRadius: "16px",
							width: "fit-content",
							fontWeight: "600",
						}}
						className="border text-alt-color"
					>
						Powered by an open interpretation layer
					</div>
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
							className="text-alt-color"
							style={{
								fontWeight: "300",
								textAlign: "center",
								maxWidth: "800px",
							}}
						>
							Access the most comprehensive onchain data built on top of our
							powerful interpretation stack. From DeFi portfolios, onchain
							prices to contextualized transaction histories.
						</h5>
					</div>
					<LinkButton
						href="/docs/api/intro"
						type="primary"
						buttonCopy="Learn More"
					/>
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
						width: "100%",
						maxWidth: "100%",
						justifyContent: "space-around",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "120px",
							maxWidth: "100%",
							justifyContent: "center",
							alignItems: "center",
							gap: "16px",
							cursor: "pointer",
						}}
					>
						<div className="card" style={{ padding: "16px" }}>
							<img
								width="48px"
								height="48px"
								src="./img/react-icons/RiDonutChartFill.png"
								alt="DeFi"
							/>
						</div>

						<p
							style={{
								marginBottom: "0px",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							Portfolio Tracking
						</p>
						<div
							className="accent-background"
							style={{ height: "2px", display: "block", width: "48px" }}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "120px",
							maxWidth: "100%",
							justifyContent: "center",
							alignItems: "center",
							gap: "16px",
							cursor: "pointer",
						}}
					>
						<div className="card" style={{ padding: "16px" }}>
							<img
								width="48px"
								height="48px"
								src="./img/react-icons/FaTimeline.png"
								alt="DeFi"
							/>
						</div>

						<p
							style={{
								marginBottom: "0px",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							Account Timelines
						</p>
						<div
							className="accent-background"
							style={{ height: "2px", display: "block", width: "48px" }}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "120px",
							maxWidth: "100%",
							justifyContent: "center",
							alignItems: "center",
							gap: "16px",
							cursor: "pointer",
						}}
					>
						<div className="card" style={{ padding: "16px" }}>
							<img
								width="48px"
								height="48px"
								src="./img/react-icons/MdOutlineAreaChart.png"
								alt="DeFi"
							/>
						</div>

						<p
							style={{
								marginBottom: "0px",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							Trending Onchain Apps
						</p>
						<div
							className="accent-background"
							style={{ height: "2px", display: "block", width: "48px" }}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "120px",
							maxWidth: "100%",
							justifyContent: "center",
							alignItems: "center",
							gap: "16px",
							cursor: "pointer",
						}}
					>
						<div className="card" style={{ padding: "16px" }}>
							<img
								width="48px"
								height="48px"
								src="./img/react-icons/HiMiniSquare3Stack3D.png"
								alt="DeFi"
							/>
						</div>

						<p
							style={{
								marginBottom: "0px",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							App <br /> Feeds
						</p>
						<div
							className="accent-background"
							style={{ height: "2px", display: "block", width: "48px" }}
						/>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							width: "120px",
							maxWidth: "100%",
							justifyContent: "center",
							alignItems: "center",
							gap: "16px",
							cursor: "pointer",
						}}
					>
						<div className="card" style={{ padding: "16px" }}>
							<img
								width="48px"
								height="48px"
								src="./img/react-icons/RiDraftFill.png"
								alt="DeFi"
							/>
						</div>

						<p
							style={{
								marginBottom: "0px",
								textAlign: "center",
								fontWeight: "500",
							}}
						>
							Contract Labelling
						</p>
						<div
							className="accent-background"
							style={{ height: "2px", display: "block", width: "48px" }}
						/>
					</div>
				</div>
			</Section>
		</div>
	);
};
