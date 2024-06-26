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
					className="intro__background"
				/>
			</div>
			<div className="container" style={{ height: "100%" }}>
				<div className="intro__content">
					<div className="intro__content__child">
						<h1 className={styles.title}>{siteConfig.tagline}</h1>
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
								<LinkButton href="/docs/litepaper" buttonCopy="Learn More" />
							</ButtonGroup>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
