import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import Manifestations from '../Manifestations';
import Notifications from '../Notifications';
import Profile from '../Profile';

const ManifestationsScreen = () => <Manifestations />;

const NotificationsScreen = () => <Notifications />;

const ProfileScreen = () => <Profile />;

const Main: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Hack to force refresh screen
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);

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
      sceneAnimationEnabled
    />
  );
};

export default Main;
