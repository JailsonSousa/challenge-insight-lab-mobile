import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import {
  Wrapper,
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  TextForm,
  LostPasswordText,
  CreateAccountText,
} from './styles';

const RecoverPassword: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            label="Email da conta"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <Button
            mode="text"
            onPress={() => console.log('Pressed')}
            color="#fff"
            compact
          >
            Recuperar Senha
          </Button>
        </Form>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CreateAccountText>Voltar</CreateAccountText>
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
};

export default RecoverPassword;
