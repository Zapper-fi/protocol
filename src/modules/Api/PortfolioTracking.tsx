import React from 'react';
import { Section } from '../../components/Section';

enum PortfolioTrackingType {
	AppHoldings = 'App Holdings',
	Tokens = 'Tokens',
	Nfts = 'NFTs',
}

export const PortfolioTracking: React.FC = () => {
	const [selectedType, setSelectedType] = React.useState<PortfolioTrackingType>(
		PortfolioTrackingType.AppHoldings,
	);

	return (
		<Section
			className="border hide-mobile"
			style={{ borderWidth: '1px', borderStyle: 'solid', padding: '64px 32px' }}
		>
			<div
				style={{
					display: 'flex',
					gap: '64px',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						flex: 1,
						height: 'fit-content',
						minWidth: '320px',
					}}
				>
					<div
						className="opacity-hover"
						style={{
							cursor: 'pointer',
							width: '100%',
							flexDirection: 'column',
						}}
						onClick={() => setSelectedType(PortfolioTrackingType.AppHoldings)}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<h5>App Holdings</h5>
							<span
								style={{
									fontSize: '24px',
									marginTop: '-24px',
									transform:
										selectedType === PortfolioTrackingType.AppHoldings
											? 'rotate(180deg)'
											: 'initial',
								}}
							>
								⌄
							</span>
						</div>
						{selectedType === PortfolioTrackingType.AppHoldings && (
							<p className="text-alt-color">
								Track your holdings across various onchain applications. From
								DeFi, NFT-Fi to Staking. Powered by an open interpretation
								layer.
							</p>
						)}
					</div>
					<hr />
					<div
						className="opacity-hover"
						style={{
							cursor: 'pointer',
							width: '100%',
							flexDirection: 'column',
						}}
						onClick={() => setSelectedType(PortfolioTrackingType.Tokens)}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<h5>Tokens</h5>
							<span
								style={{
									fontSize: '24px',
									marginTop: '-24px',
									transform:
										selectedType === PortfolioTrackingType.Tokens
											? 'rotate(180deg)'
											: 'initial',
								}}
							>
								⌄
							</span>
						</div>
						{selectedType === PortfolioTrackingType.Tokens && (
							<p className="text-alt-color">
								Track your token holdings across various chains.
							</p>
						)}
					</div>
					<hr />
					<div
						className="opacity-hover"
						style={{
							cursor: 'pointer',
							width: '100%',
							flexDirection: 'column',
						}}
						onClick={() => setSelectedType(PortfolioTrackingType.Nfts)}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<h5>NFTs</h5>
							<span
								style={{
									fontSize: '24px',
									marginTop: '-24px',
									transform:
										selectedType === PortfolioTrackingType.Nfts
											? 'rotate(180deg)'
											: 'initial',
								}}
							>
								⌄
							</span>
						</div>
						{selectedType === PortfolioTrackingType.Nfts && (
							<p className="text-alt-color">
								Track your NFT holdings across various chains.
							</p>
						)}
					</div>
				</div>
				<div style={{ flex: 1, textAlign: 'center', height: '420px' }}>
					{selectedType === PortfolioTrackingType.AppHoldings && (
						<img
							className="full-width-mobile"
							height="100%"
							width="100%"
							src="./img/assets/App_holdings.svg"
							alt="placeholder"
							style={{ objectFit: 'contain', width: '100%', minWidth: '320px' }}
						/>
					)}
					{selectedType === PortfolioTrackingType.Tokens && (
						<img
							className="full-width-mobile"
							height="100%"
							width="100%"
							src="./img/assets/Tokens.svg"
							alt="placeholder"
							style={{ objectFit: 'contain', width: '100%', minWidth: '320px' }}
						/>
					)}
					{selectedType === PortfolioTrackingType.Nfts && (
						<img
							className="full-width-mobile"
							height="100%"
							width="100%"
							src="./img/assets/NFT.svg"
							alt="placeholder"
							style={{ objectFit: 'contain', width: '100%', minWidth: '320px' }}
						/>
					)}
				</div>
			</div>
		</Section>
	);
};
