import React from "react";

export const InterpretationHeader: React.FC = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "0x",
				padding: "0 32px",
			}}
		>
			<h2 style={{ fontWeight: "600" }}>
				An open interpretation layer, built by{" "}
				<span className="text-accent-color">you</span>.
			</h2>
			<h5
				style={{ fontWeight: 300, maxWidth: "1000px" }}
				className="text-alt-color"
			>
				We've created powerful tools allowing anyone to easily contribute and
				make blockchains human-readable. No coding is required.
			</h5>
		</div>
	);
};
