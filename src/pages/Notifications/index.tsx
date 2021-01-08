import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { List, Divider, ActivityIndicator } from 'react-native-paper';
import { useNotification, NotificationProps } from '../../hooks/notification';
import Header from '../../components/Header';

const Notifications: React.FC = () => {
  const { getAllNotifications } = useNotification();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationProps[]>(
    [] as NotificationProps[],
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const notificationsResponse = await getAllNotifications();

      console.log(notificationsResponse);
      setNotifications(notificationsResponse);
      setLoading(false);
    }

    fetchData();
  }, [getAllNotifications]);

  const renderItem = ({ item }) => (
    <>
      <List.Item
        title={item.message}
        description={item.dateFormatted}
        titleNumberOfLines={1000}
      />
      <Divider />
    </>
  );

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <ActivityIndicator color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Header title="Notificações" />
      <List.Section style={{ padding: 10 }}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </List.Section>
    </>
  );
};

export default Notifications;
