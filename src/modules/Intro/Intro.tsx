import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "../../pages/index.module.scss";
import { LinkButton } from "../../components/LinkButton";
import { ButtonGroup } from "../../components/ButtonGroup";

export const Intro: React.FC = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className="intro">
			<div
				className="container"
				style={{ height: "100%", position: "absolute", zIndex: -1 }}
			>
				<img
					loading="lazy"
					alt="illuminating the onchain world"
					src="./img/background.png"
					style={{
						width: "100%",
						height: "100%",
						borderRadius: "16px",
						objectFit: "cover",
					}}
				/>
			</div>
			<div className="container" style={{ height: "100%" }}>
				<div className="intro__content">
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
