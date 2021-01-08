import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView } from 'react-native';
import { Appbar, List, Divider, ActivityIndicator } from 'react-native-paper';
import {
  useManifestation,
  ManifestationProps,
} from '../../hooks/manifestation';
import Header from '../../components/Header';

const Manifestations: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [manifestations, setManifestations] = useState<ManifestationProps[]>(
    [] as ManifestationProps[],
  );
  const { navigate } = useNavigation();
  const { getAllManifestations } = useManifestation();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const manifestationsResponse = await getAllManifestations();
      setManifestations(manifestationsResponse);
      setLoading(false);
    }

    fetchData();
  }, [getAllManifestations]);

  const renderItem = ({ item }) => (
    <>
      <List.Item
        left={() => <List.Icon icon="text-box-multiple" />}
        title={item.recipient}
        description={`${item.manifest_code} - ${item.dateFormatted}`}
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
          data={manifestations}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </List.Section>
    </>
  );
};

export default Manifestations;
