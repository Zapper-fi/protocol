import React from "react";
import { Section } from "../../components/Section";

export const AppFeeds: React.FC = () => {
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
						App{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Feeds
						</span>
					</h2>
					<p className="text-alt-color">
						Track activity happening inside a specific app or protocol
					</p>
				</div>
				<div style={{ flex: 1, textAlign: "center" }}>image</div>
			</div>
		</Section>
	);
};
