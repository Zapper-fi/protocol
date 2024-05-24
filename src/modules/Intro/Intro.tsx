import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import styles from "../../pages/index.module.scss";
import Link from "@docusaurus/Link";

export const Intro: React.FC = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
							maxWidth: "fit-content",
						}}
					>
						<h1 className={styles.title}>{siteConfig.tagline}</h1>
						<h3 className={styles.subtitle}>{siteConfig.title}</h3>
						<div className={styles.buttons}>
							<Link className={styles.button} to="/docs/introduction">
								Learn More
							</Link>
						</div>
					</div>
					<img
						src="./img/light.png"
						alt="Zapper Studio"
						style={{ width: "520px", height: "auto", borderRadius: "16px" }}
					/>
				</div>
			</div>
		</header>
	);
};
