import type React from 'react';
import styles from '../pages/index.module.scss';
import Link from '@docusaurus/Link';

enum ButtonType {
	Primary = 'primary',
	Secondary = 'secondary',
}

export const LinkButton: React.FC<{
	type?: ButtonType;
	buttonCopy: string;
	href: string;
}> = ({ type = ButtonType.Primary, buttonCopy, href }) => {
	return (
		<Link
			className={
				type === ButtonType.Primary ? 'button--primary' : 'button--secondary'
			}
			style={{
				borderRadius: '8px',
				padding: '0px 16px',
				display: 'flex',
				alignItems: 'center',
				height: '48px',
				textDecoration: 'none',
				fontSize: '16px',
				fontWeight: 500,
				cursor: 'pointer',
				width: 'fit-content',
				whiteSpace: 'nowrap',
			}}
			to={href}
		>
			{buttonCopy}
		</Link>
	);
};
