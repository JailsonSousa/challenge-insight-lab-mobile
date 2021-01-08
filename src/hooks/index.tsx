/* eslint-disable react/prop-types */
import React from 'react';

import { AuthProvider } from './auth';
import { ManifestationProvider } from './manifestation';
import { NotificationProvider } from './notification';

const AppProvider: React.FC = ({ children }) => (
  <ManifestationProvider>
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  </ManifestationProvider>
);

export default AppProvider;
