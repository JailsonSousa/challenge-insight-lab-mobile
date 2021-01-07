import React, { useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput as TextInputRN,
} from 'react-native';
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
  GoBackText,
} from './styles';

const SignUp: React.FC = () => {
  const cpfInputRef = useRef<TextInputRN>(null);
  const emailInputRef = useRef<TextInputRN>(null);
  const passwordInputRef = useRef<TextInputRN>(null);

  const navigation = useNavigation();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = useCallback(
    async (userName, userCpf, userEmail, userPassword) => {
      await signUp({
        name: userName,
        cpf: userCpf,
        email: userEmail,
        password: userPassword,
      });
    },
    [signUp],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Wrapper>
          <Container>
            <Header>
              <Title>Simplifique!</Title>
              <Subtitle>
                A Ferramenta que ajuda a simplificar o serviço público no Brasil
              </Subtitle>
            </Header>

            <Form>
              <TextForm>Criar nova conta</TextForm>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                label="Nome completo"
                value={name}
                onChangeText={text => setName(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpfInputRef.current?.focus();
                }}
              />
              <TextInput
                ref={cpfInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numbers-and-punctuation"
                label="CPF"
                value={cpf}
                onChangeText={text => setCpf(text)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <TextInput
                ref={emailInputRef}
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
                  handleSignUp(name, cpf, email, password);
                }}
              />

              <Button
                mode="text"
                onPress={() => handleSignUp(name, cpf, email, password)}
                color="#fff"
                compact
              >
                Criar
              </Button>
            </Form>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <GoBackText>Voltar</GoBackText>
            </TouchableOpacity>
          </Container>
        </Wrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
