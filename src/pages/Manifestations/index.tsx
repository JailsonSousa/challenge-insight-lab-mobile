import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView, ScrollView, Alert } from 'react-native';
import {
  Appbar,
  List,
  Divider,
  ActivityIndicator,
  Caption,
  Portal,
  Modal,
} from 'react-native-paper';
import { useAuth } from '../../hooks/auth';

import {
  useManifestation,
  ManifestationProps,
} from '../../hooks/manifestation';

import Header from '../../components/Header';
import {
  Title,
  Item,
  ItemDescription,
  ItemText,
  TitleSection,
  Section,
} from './styles';

const Manifestations: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [
    currentManifestation,
    setCurrentManifestation,
  ] = useState<ManifestationProps>({} as ManifestationProps);
  const [manifestations, setManifestations] = useState<ManifestationProps[]>(
    [] as ManifestationProps[],
  );
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const { getAllManifestations, deleteManifestation } = useManifestation();

  const refreshData = useCallback(async () => {
    setLoading(true);
    const manifestationsResponse = await getAllManifestations(user.uid);
    setManifestations(manifestationsResponse);
    setLoading(false);
  }, [getAllManifestations, user.uid]);

  useEffect(() => {
    async function fetchData() {
      await refreshData();
    }
    fetchData();
  }, [refreshData]);

  const handleShowModal = useCallback(() => {
    setVisibleModalEdit(!visibleModalEdit);
  }, [visibleModalEdit]);

  const handleRemoveManifestation = useCallback(
    async manifestationID => {
      setLoading(true);
      await deleteManifestation(manifestationID);
      await refreshData();
      setLoading(false);
    },
    [deleteManifestation, refreshData],
  );

  const renderItem = ({ item }) => (
    <>
      <List.Item
        left={() => <List.Icon icon="text-box-multiple" />}
        title={item.recipient}
        description={`${item.manifest_code} - ${item.dateFormatted}`}
        onPress={() => {
          setCurrentManifestation(item);
          handleShowModal();
        }}
        onLongPress={() =>
          Alert.alert(
            'Excluir manifestação',
            'Tem certeza que deseja excluir essa manifestação?',
            [
              {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'Confirmar',
                onPress: () => handleRemoveManifestation(item.uid),
              },
            ],
            { cancelable: false },
          )
        }
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

      <Portal>
        <Modal
          visible={visibleModalEdit}
          onDismiss={handleShowModal}
          contentContainerStyle={{
            width: '90%',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#ebecf1',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <ScrollView>
            <Title>
              Manifestação:
              {`  ${currentManifestation.manifest_code}`}
            </Title>
            <Section>
              <TitleSection>Identificação do usuário</TitleSection>
              <Item>
                <ItemText>Nome completo</ItemText>
                <ItemDescription>{user?.name}</ItemDescription>
              </Item>
              <Item>
                <ItemText>Email</ItemText>
                <ItemDescription>{user?.email}</ItemDescription>
              </Item>
              <Item>
                <ItemText>CPF</ItemText>
                <ItemDescription>{user?.cpf}</ItemDescription>
              </Item>
            </Section>

            <Section>
              <TitleSection>Destinatário da mensagem</TitleSection>
              <Item>
                <ItemText>Nome</ItemText>
                <ItemDescription>
                  {currentManifestation?.recipient}
                </ItemDescription>
              </Item>
            </Section>

            <Section>
              <TitleSection>Destinatário da mensagem</TitleSection>
              <Item>
                <ItemText>Mensagem</ItemText>
                <ItemDescription>
                  {currentManifestation?.message}
                </ItemDescription>
              </Item>
            </Section>
          </ScrollView>
        </Modal>
      </Portal>

      {!manifestations ? (
        <Caption
          style={{
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Nenhuma manifestação para exibir até o momento...
        </Caption>
      ) : (
        <List.Section style={{ padding: 10 }}>
          <FlatList
            data={manifestations}
            renderItem={renderItem}
            keyExtractor={item => item.uid}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </List.Section>
      )}
    </>
  );
};

export default Manifestations;
