import React from "react";
import { Section } from "../../components/Section";

export const Labelling: React.FC = () => {
	return (
		<Section
			className="border hide-mobile"
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
						Contract{" "}
						<span className="text-alt-color" style={{ fontWeight: 500 }}>
							Labelling
						</span>
					</h2>
					<p className="text-alt-color">
						Get comprehensive information about the ownership of a contract, its
						activity, and its relationship with other contracts.
					</p>
				</div>
				<div style={{ flex: 1, textAlign: "center" }}>
					<img
						height="100%"
						width="100%"
						src="./img/assets/Contract_Labelling.svg"
						alt="placeholder"
						style={{
							objectFit: "contain",
							minWidth: "500px",
							maxHeight: "400px",
						}}
					/>
				</div>
			</div>
		</Section>
	);
};
