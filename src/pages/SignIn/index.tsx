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

const SignIn: React.FC = () => {
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
          <TextForm>Acesso ao sistema</TextForm>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />

          <TextInput
            label="Senha secreta"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('recoverpassword')}
          >
            <LostPasswordText>Esqueci a senha</LostPasswordText>
          </TouchableOpacity>

          <Button
            mode="text"
            onPress={() => console.log('Pressed')}
            color="#fff"
            compact
          >
            Acessar
          </Button>
        </Form>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <CreateAccountText>Crie sua conta aqui</CreateAccountText>
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
