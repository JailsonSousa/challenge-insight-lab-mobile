import React, { useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, TextInput as TextInputRN } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { useAuth } from '../../hooks/auth';

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
  const passwordInputRef = useRef<TextInputRN>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = useCallback(
    async (userEmail, userPassword) => {
      await signIn({ email: userEmail, password: userPassword });
    },
    [signIn],
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
          <TextForm>Acesso ao sistema</TextForm>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <TextInput
            ref={passwordInputRef}
            label="Senha secreta"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => {
              handleSignIn(email, password);
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('recoverpassword')}
          >
            <LostPasswordText>Esqueci a senha</LostPasswordText>
          </TouchableOpacity>

          <Button
            mode="text"
            onPress={() => handleSignIn(email, password)}
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
