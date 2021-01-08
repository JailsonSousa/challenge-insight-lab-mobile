import React from 'react';
import { FlatList } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import Header from '../../components/Header';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    msg: 'Manifestação registrada com sucesso.',
    created_at: 'há 2 horas atrás',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    msg: 'Manifestação registrada com sucesso.',
    created_at: 'há 2 horas atrás',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    msg: 'Manifestação registrada com sucesso.',
    created_at: 'há 2 horas atrás',
  },
];

const Notifications: React.FC = () => {
  const renderItem = ({ item }) => (
    <>
      <List.Item title={item.msg} description={item.created_at} />
      <Divider />
    </>
  );

  return (
    <>
      <Header title="Notificações" />
      <List.Section style={{ padding: 10 }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </List.Section>
    </>
  );
};

export default Notifications;
