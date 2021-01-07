import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
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

const SignUp: React.FC = () => {
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
          <TextForm>Criar nova conta</TextForm>
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

          <Button
            mode="text"
            onPress={() => console.log('Pressed')}
            color="#fff"
            compact
          >
            Criar
          </Button>
        </Form>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CreateAccountText>Voltar</CreateAccountText>
        </TouchableOpacity>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
