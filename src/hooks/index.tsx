/* eslint-disable react/prop-types */
import React from 'react';

import { AuthProvider } from './auth';
import { ManifestationProvider } from './manifestation';

const AppProvider: React.FC = ({ children }) => (
  <ManifestationProvider>
    <AuthProvider>{children}</AuthProvider>
  </ManifestationProvider>
);

export default AppProvider;
