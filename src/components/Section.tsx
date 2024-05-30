import React from "react";

export const Section: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<div
			style={{
				padding: "32px 0px",
				display: "flex",
				flexDirection: "column",
				gap: "32px",
			}}
		>
			{children}
		</div>
	);
};
