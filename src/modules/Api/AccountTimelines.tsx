import React from "react";
import { Section } from "../../components/Section";

export const AccountTimelines: React.FC = () => {
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
						Account{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Timelines
						</span>
					</h2>
					<p className="text-alt-color">
						Get a chronological view of all the onchain activity of an account,
						or bundle of accounts. Human-readable transactions, and contextual
						information relating to accounts, actions, and events.
					</p>
					<p className="text-alt-color">
						Powered by an open interpretation layer.
					</p>
				</div>
				<div style={{ flex: 1, textAlign: "center" }}>image</div>
			</div>
		</Section>
	);
};
