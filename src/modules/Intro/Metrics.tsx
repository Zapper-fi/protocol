import React from "react";

export const Metrics: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "32px 0px",
				gap: "32px",
			}}
		>
			<h2
				style={{
					fontWeight: "600",
				}}
			>
				Interpretation Metrics
			</h2>
			<div
				style={{
					display: "flex",
					gap: "16px",
				}}
			>
				<div
					style={{
						flex: "1",
						borderLeft: "solid 2px #a387ff",
						padding: "0px 16px",
						flexDirection: "column",
						display: "flex",
						gap: "0px",
						justifyContent: "center",
					}}
				>
					<h3 style={{ marginBottom: "0px" }}>4.59 Billion</h3>
					<p style={{ marginBottom: "0px" }}>
						Total Human Readable Transactions
					</p>
				</div>
				<div
					style={{
						flex: "1",
						borderLeft: "solid 2px #a387ff",
						padding: "0px 16px",
						flexDirection: "column",
						display: "flex",
						gap: "0px",
						justifyContent: "center",
					}}
				>
					<h3 style={{ marginBottom: "0px" }}>2,500</h3>
					<p style={{ marginBottom: "0px" }}>Position Interpreters</p>
				</div>
				<div
					style={{
						flex: "1",
						borderLeft: "solid 2px #a387ff",
						padding: "0px 16px",
						flexDirection: "column",
						display: "flex",
						gap: "0px",
						justifyContent: "center",
					}}
				>
					<h3 style={{ marginBottom: "0px" }}>7,200</h3>
					<p style={{ marginBottom: "0px" }}>Event Interpreters</p>
				</div>
				<div
					style={{
						flex: "1",
						borderLeft: "solid 2px #a387ff",
						padding: "0px 16px",
						flexDirection: "column",
						display: "flex",
						gap: "0px",
						justifyContent: "center",
					}}
				>
					<h3 style={{ marginBottom: "0px" }}>10</h3>
					<p style={{ marginBottom: "0px" }}>Chains Supported</p>
				</div>
			</div>
		</div>
	);
};
