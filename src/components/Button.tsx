export function Button(props) {
	const { children, ...rest } = props;

	return (
		<button
			className="button--primary cursor-pointer border-none rounded-lg px-4 display-flex align-items-center h-12 text-[16px] font-semibold opacity-100 hover:opacity-80 transition-all"
			{...rest}
		>
			{children}
		</button>
	);
}
