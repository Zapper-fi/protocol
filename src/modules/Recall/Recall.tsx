import type React from 'react';
import { LinkButton } from '../../components/LinkButton';

export const Recall: React.FC = () => {
	return (
		<div style={{ padding: '128px 0px' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div
					style={{
						display: 'flex',
						gap: '32px',
						width: '100%',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '16px',
							alignItems: 'center',
							flex: 1,
						}}
					>
						<h1
							style={{
								flex: 1,
								fontWeight: '600',
								textAlign: 'center',
							}}
						>
							Be a part of the movement
						</h1>
						<h5
							className="text-alt-color"
							style={{
								fontWeight: '300',
								textAlign: 'center',
								maxWidth: '800px',
							}}
						>
							Join our community, and help us make blockchains readable to
							everyone!
						</h5>
					</div>
					<LinkButton
						href="/docs/interpretation/contribute"
						type="primary"
						buttonCopy="Get Started"
					/>
				</div>
			</div>
		</div>
	);
};
