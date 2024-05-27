import React from "react";
import styles from "../pages/index.module.scss";
import Link from "@docusaurus/Link";

enum ButtonType {
	Primary = "primary",
	Secondary = "secondary",
}

export const LinkButton: React.FC<{
	type?: ButtonType;
	buttonCopy: string;
	href: string;
}> = ({ type = ButtonType.Primary, buttonCopy, href }) => {
	return (
		<Link
			className={styles.button}
			style={{
				color: type === ButtonType.Primary ? "white" : "#0070f3",
				border: type === ButtonType.Primary ? "none" : "1px solid #0070f3",
				borderRadius: "8px",
				padding: "0px 16px",
				display: "flex",
				alignItems: "center",
				height: "48px",
				textDecoration: "none",
				fontSize: "16px",
				fontWeight: 600,
				cursor: "pointer",
			}}
			to={href}
		>
			{buttonCopy}
		</Link>
	);
};
