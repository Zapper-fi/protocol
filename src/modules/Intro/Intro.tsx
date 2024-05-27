import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "../../pages/index.module.scss";
import { LinkButton } from "../../components/LinkButton";
import { ButtonGroup } from "../../components/ButtonGroup";

export const Intro: React.FC = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header
			style={{
				padding: "16px",
				height: "calc(100vh - 60px)",
				position: "relative",
			}}
		>
			<div
				style={{
					backgroundImage: "url(./img/background2.png)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					width: "calc(100% - 32px)", // Remove PaddingX
					height: "calc(100% - 32px)", // Remove PaddingY
					position: "absolute",
					zIndex: -1,
					borderRadius: "16px",
				}}
			/>
			<div className="container" style={{ height: "100%" }}>
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						gap: "32px",
						padding: "88px 0px",
					}}
				>
					<div
						style={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "space-between",
							maxWidth: "540px",
						}}
					>
						<h1
							style={{ color: "white", fontSize: "80px" }}
							className={styles.title}
						>
							{siteConfig.tagline}
						</h1>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
						>
							<h4 style={{ color: "white" }} className={styles.subtitle}>
								{siteConfig.title}
							</h4>
							<ButtonGroup>
								<LinkButton href="/docs/introduction" buttonCopy="Learn More" />
							</ButtonGroup>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
