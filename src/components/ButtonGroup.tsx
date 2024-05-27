import React from "react";
import { ReactNode } from "@mdx-js/react/lib";

export const ButtonGroup: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	return <div style={{ display: "flex", gap: "16px" }}>{children}</div>;
};
