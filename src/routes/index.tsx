import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import RecoverPassword from '../pages/RecoverPassword';

const Default = createStackNavigator();

const DefaultRoutes: React.FC = () => (
  <Default.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#EBEDF3' },
    }}
    initialRouteName="Products"
  >
    <Default.Screen name="signin" component={SignIn} />
    <Default.Screen name="signup" component={SignUp} />
    <Default.Screen name="recoverpassword" component={RecoverPassword} />
  </Default.Navigator>
);

export default DefaultRoutes;
