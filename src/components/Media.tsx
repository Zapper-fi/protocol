import React, { useState, useEffect } from "react";

export const Media: React.FC<{
	src: string;
	darkSrc?: string;
	isVideo?: boolean;
	height: `${number}px`;
}> = ({ src, darkSrc, isVideo, height }) => {
	const [theme, setTheme] = useState(localStorage.getItem("theme"));

	useEffect(() => {
		const handleThemeChange = () => {
			setTheme(localStorage.getItem("theme"));
		};

		window.addEventListener("storage", handleThemeChange);

		return () => {
			window.removeEventListener("storage", handleThemeChange);
		};
	}, []);

	const isDarkMode = theme === "dark";

	const themeSrc = isDarkMode && darkSrc ? darkSrc : src;

	console.log(themeSrc);

	if (isVideo) {
		return (
			<video
				key={themeSrc}
				height={height}
				controls={false}
				autoPlay={true}
				loop={true}
				muted
				playsInline
			>
				<source src={themeSrc} />
				Your browser does not support the video tag.
			</video>
		);
	}

	return (
		<img src={themeSrc} alt="media" style={{ width: "100%", height: "auto" }} />
	);
};
