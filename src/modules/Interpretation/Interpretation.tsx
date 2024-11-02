import type React from 'react';
import { Section } from '../../components/Section';
import { InterpretationAppToken } from './InterpretationAppToken';
import { InterpretationEvent } from './InterpretationEvent';
import { InterpretationHeader } from './InterpretationHeader';

export const Interpretation: React.FC = () => {
	return (
		<Section style={{ gap: '128px', marginTop: '128px' }}>
			<InterpretationHeader />
			<InterpretationEvent />
			<InterpretationAppToken />
		</Section>
	);
};
