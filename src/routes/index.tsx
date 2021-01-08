import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import RecoverPassword from '../pages/RecoverPassword';
import Main from '../pages/Main';
import Manifestation from '../pages/Manifestations/Manifestation';
import ManifestationConfirmation from '../pages/Manifestations/ManifestationConfirmation';

const Default = createStackNavigator();

const DefaultRoutes: React.FC = () => (
  <Default.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#EBEDF3' },
    }}
    initialRouteName="signin"
  >
    <Default.Screen name="signin" component={SignIn} />
    <Default.Screen name="signup" component={SignUp} />
    <Default.Screen name="recoverpassword" component={RecoverPassword} />
    <Default.Screen name="main" component={Main} />
    <Default.Screen name="manifestation" component={Manifestation} />
    <Default.Screen
      name="manifestationConfirmation"
      component={ManifestationConfirmation}
    />
  </Default.Navigator>
);

export default DefaultRoutes;
