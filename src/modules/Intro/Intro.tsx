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
				<h1 className={styles.title}>{siteConfig.title}</h1>
				<h3 className={styles.subtitle}>{siteConfig.tagline}</h3>
				<div className={styles.buttons}>
					<Link className={styles.button} to="/docs/intro">
						Learn More
					</Link>
				</div>
			</div>
		</header>
	);
};
