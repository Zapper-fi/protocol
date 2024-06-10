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
				height: "calc(100vh - 92px)",
				zIndex: 1,
				position: "relative",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div
				className="container"
				style={{ height: "100%", position: "absolute", zIndex: -1 }}
			>
				<div
					style={{
						backgroundImage: "url(./img/background.png)",
						backgroundSize: "cover",
						backgroundPosition: "center",
						width: "calc(100%)", // Remove PaddingX
						height: "calc(100%)", // Remove PaddingBottom

						borderRadius: "16px",
					}}
				/>
			</div>
			<div className="container" style={{ height: "100%" }}>
				<div
					style={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						gap: "32px",
						padding: "64px",
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
							style={{ color: "white", fontSize: "72px" }}
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
