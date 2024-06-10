// get theme from local storage
export const getTheme = () => {
	const theme = localStorage.getItem("theme");
	return theme;
};
