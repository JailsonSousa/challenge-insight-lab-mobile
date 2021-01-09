import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { List, Divider, ActivityIndicator, Caption } from 'react-native-paper';
import { useNotification, NotificationProps } from '../../hooks/notification';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

const Notifications: React.FC = () => {
  const { getAllNotifications } = useNotification();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationProps[]>(
    [] as NotificationProps[],
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const notificationsResponse = await getAllNotifications(user.uid);

      setNotifications(notificationsResponse);
      setLoading(false);
    }

    fetchData();
  }, [getAllNotifications, user.uid]);

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

      {!notifications ? (
        <Caption
          style={{
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Nenhuma notificação para exibir até o momento...
        </Caption>
      ) : (
        <List.Section style={{ padding: 10 }}>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={item => item.uid}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </List.Section>
      )}
    </>
  );
};

export default Notifications;
