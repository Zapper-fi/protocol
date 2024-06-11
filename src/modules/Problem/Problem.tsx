import { Card } from "../../components/Card";
import { Section } from "../../components/Section";
import React from "react";

export const Problem: React.FC = () => {
	return (
		<Section>
			<div
				className="border"
				style={{
					display: "flex",
					gap: "40px",
					padding: "64px 64px",
					borderWidth: "4px",
					borderStyle: "double",
					alignItems: "center",
					marginTop: "64px",
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
					<h5 color="" style={{ fontWeight: "normal", lineHeight: "28px" }}>
						The amount of onchain applications is increasing exponentially - no
						centralized entity will be able to organize everything.
					</h5>
					<h5 style={{ fontWeight: "normal", lineHeight: "28px" }}>
						Blockchains are bustling digital downtowns containing rich economic
						opportunities, yet are very difficult to navigate.
					</h5>
				</div>
			</div>
		</Section>
	);
};
