import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';

import {
  Wrapper,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  TextForm,
  GoBackText,
} from './styles';

const RecoverPassword: React.FC = () => {
  const navigation = useNavigation();
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleRecoverPassword = useCallback(
    async userEmail => {
      setLoading(true);
      await forgotPassword(userEmail);
      setLoading(false);
    },
    [forgotPassword],
  );

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Simplifique!</Title>
          <Subtitle>
            A Ferramenta que ajuda a simplificar o serviço público no Brasil
          </Subtitle>
        </Header>

        <Form>
          <TextForm>Recuperar Senha</TextForm>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            label="Email da conta"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={() => {
              handleRecoverPassword(email);
            }}
          />

          <Button
            mode="text"
            onPress={() => handleRecoverPassword(email)}
            color="#fff"
            compact
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator animating color="#fff" />
            ) : (
              'Recuperar Senha'
            )}
          </Button>
        </Form>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <GoBackText>Voltar</GoBackText>
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
};

export default RecoverPassword;
