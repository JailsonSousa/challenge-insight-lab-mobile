import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Appbar, List, Divider } from 'react-native-paper';
import Header from '../../components/Header';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula metus in nisi aliquet dignissim. Nulla lacinia egestas leo vel pellentesque. Proin vulputate nulla non libero viverra varius.',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula metus in nisi aliquet dignissim. Nulla lacinia egestas leo vel pellentesque. Proin vulputate nulla non libero viverra varius.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula metus in nisi aliquet dignissim. Nulla lacinia egestas leo vel pellentesque. Proin vulputate nulla non libero viverra varius.',
  },
];

const Manifestations: React.FC = () => {
  const { navigate } = useNavigation();

  const renderItem = ({ item }) => (
    <>
      <List.Item
        left={() => <List.Icon icon="text-box-multiple" />}
        title={item.title}
        description={item.description}
      />
      <Divider />
    </>
  );

  return (
    <>
      <Header
        title="Manifestações"
        action={
          <Appbar.Action
            icon="text-box-plus"
            onPress={() => navigate('manifestation')}
          />
        }
      />

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

export default Manifestations;
