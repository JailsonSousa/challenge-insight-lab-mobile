/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
} from '@expo-google-fonts/roboto-slab';
import AppLoading from 'expo-app-loading';
import { navigationRef } from './services/RootNavigation';

import DefaultRoutes from './routes';
import AppProvider from './hooks';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0b7dee',
  },
};

const App: React.FC = () => {
  const [fontsLoaded, error] = useFonts({
    RobotoSlab_Regular: RobotoSlab_400Regular,
    RobotoSlab_Medium: RobotoSlab_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        <AppProvider>
          <DefaultRoutes />
        </AppProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default registerRootComponent(App);
