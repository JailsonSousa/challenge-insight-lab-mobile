import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar, Button, ActivityIndicator } from 'react-native-paper';
import {
  ManifestationProps,
  useManifestation,
} from '../../../hooks/manifestation';
import Header from '../../../components/Header';
import {
  Container,
  Title,
  Section,
  TitleSection,
  Item,
  ItemText,
  ItemDescription,
} from './styles';

const ManifestationConfirmation: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { createManifestation, loadingManifestation } = useManifestation();
  const [manifestation, setManifestation] = useState<
    ManifestationProps | undefined
  >({} as ManifestationProps);

  useEffect(() => {
    setManifestation(params?.manifestation as ManifestationProps);
  }, [params?.manifestation]);

  const handleConfirm = useCallback(
    manifestationConfirmed => {
      createManifestation(manifestationConfirmed);
    },
    [createManifestation],
  );

  return (
    <>
      <Header
        title="Registrar Manifestação"
        backAction={
          <Appbar.BackAction onPress={goBack} disabled={loadingManifestation} />
        }
      />

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Container>
          <Title>Confirmação da manifestação</Title>
          <Section>
            <TitleSection>Identificação do usuário</TitleSection>
            <Item>
              <ItemText>Nome completo</ItemText>
              <ItemDescription>{manifestation?.user?.name}</ItemDescription>
            </Item>
            <Item>
              <ItemText>Email</ItemText>
              <ItemDescription>{manifestation?.user?.email}</ItemDescription>
            </Item>
            <Item>
              <ItemText>CPF</ItemText>
              <ItemDescription>{manifestation?.user?.cpf}</ItemDescription>
            </Item>
          </Section>

          <Section>
            <TitleSection>Destinatário da mensagem</TitleSection>
            <Item>
              <ItemText>Nome</ItemText>
              <ItemDescription>{manifestation?.recipient}</ItemDescription>
            </Item>
          </Section>

          <Section>
            <TitleSection>Destinatário da mensagem</TitleSection>
            <Item>
              <ItemText>Mensagem</ItemText>
              <ItemDescription>{manifestation?.message}</ItemDescription>
            </Item>
          </Section>
          <Button
            mode="text"
            compact
            disabled={loadingManifestation}
            onPress={() =>
              Alert.alert(
                'Confirmação de manifestação',
                'Tem certeza que deseja enviar essa manifestação?',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {
                    text: 'Enviar',
                    onPress: () => handleConfirm(manifestation),
                  },
                ],
                { cancelable: false },
              )
            }
          >
            {loadingManifestation ? (
              <ActivityIndicator animating color="#fff" />
            ) : (
              'Confirmar Envio'
            )}
          </Button>
        </Container>
      </ScrollView>
    </>
  );
};

export default ManifestationConfirmation;
