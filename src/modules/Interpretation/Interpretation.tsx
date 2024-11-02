import type React from 'react';
import { Section } from '../../components/Section';
import { InterpretationHeader } from './InterpretationHeader';
import { InterpretationEvent } from './InterpretationEvent';
import { InterpretationAppToken } from './InterpretationAppToken';

export const Interpretation: React.FC = () => {
	return (
		<Section style={{ gap: '128px', marginTop: '128px' }}>
			<InterpretationHeader />
			<InterpretationEvent />
			<InterpretationAppToken />
		</Section>
	);
};
