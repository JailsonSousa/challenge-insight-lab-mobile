import React from 'react';
import { BottomNavigation } from 'react-native-paper';

import Manifestations from '../Manifestations';
import Notifications from '../Notifications';
import Profile from '../Profile';

const ManifestationsScreen = () => <Manifestations />;

const NotificationsScreen = () => <Notifications />;

const ProfileScreen = () => <Profile />;

const Main: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'manifestations', title: 'Manifestações', icon: 'view-list' },
    { key: 'notifications', title: 'Notificações', icon: 'bell' },
    { key: 'profile', title: 'Perfil', icon: 'account-circle' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    manifestations: ManifestationsScreen,
    notifications: NotificationsScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Main;
