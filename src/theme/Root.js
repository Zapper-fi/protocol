import React from 'react';
import { Providers } from '../components/Providers'

export default function Root({children}) {
  return <Providers>{children}</Providers>;
}