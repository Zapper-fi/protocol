export function Button(props) {
	const { children, ...rest } = props;

	return (
		<button
			style={{
				border: 'none',
				borderRadius: '8px',
				padding: '0px 16px',
				display: 'flex',
				alignItems: 'center',
				height: '48px',
				fontSize: '16px',
				fontWeight: 500,
			}}
			{...rest}
		>
			{children}
		</button>
	);
}
