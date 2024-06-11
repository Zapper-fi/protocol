import React from "react";

export const InterpretationHeader: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				padding: "0 32px",
				alignItems: "center",
			}}
		>
			<h1 style={{ fontWeight: "600", textAlign: "center" }}>
				An open interpretation layer, built by{" "}
				<span className="text-accent-color">you</span>.
			</h1>
			<p
				style={{ fontWeight: 300, maxWidth: "600px", textAlign: "center" }}
				className="text-alt-color"
			>
				We've created powerful tools allowing anyone to easily contribute and
				make blockchains human-readable. No coding is required.
			</p>
		</div>
	);
};
