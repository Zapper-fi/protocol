import BrowserOnly from '@docusaurus/BrowserOnly';
import type React from 'react';
import { useEffect, useState } from 'react';

export const Media: React.FC<{
	src: string;
	darkSrc?: string;
	isVideo?: boolean;
	height: `${number}px`;
}> = ({ ...props }) => {
	return (
		<BrowserOnly>
			{() => {
				return <MediaContent {...props} />;
			}}
		</BrowserOnly>
	);
};

const MediaContent: React.FC<{
	src: string;
	darkSrc?: string;
	isVideo?: boolean;
	height: `${number}px`;
	mixBlendMode?: string;
}> = ({ src, darkSrc, isVideo, height, mixBlendMode }) => {
	const [theme, setTheme] = useState(localStorage.getItem('theme'));

	useEffect(() => {
		const handleThemeChange = () => {
			setTheme(localStorage.getItem('theme'));
		};

		window.addEventListener('storage', handleThemeChange);

		return () => {
			window.removeEventListener('storage', handleThemeChange);
		};
	}, []);

	const isDarkMode = theme === 'dark';

	const themeSrc = isDarkMode && darkSrc ? darkSrc : src;

	if (isVideo) {
		return (
			<video
				key={themeSrc}
				height="100%"
				width="100%"
				controls={false}
				autoPlay={true}
				loop={true}
				muted
				playsInline
				style={{
					mixBlendMode: darkSrc && isDarkMode ? mixBlendMode : undefined,
					objectFit: 'cover',
				}}
			>
				<source src={themeSrc} />
				Your browser does not support the video tag.
			</video>
		);
	}

	return (
		<img src={themeSrc} alt="media" style={{ width: '100%', height: 'auto' }} />
	);
};
