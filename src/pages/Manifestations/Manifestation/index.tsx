import React, { useState, useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Button } from 'react-native-paper';
import Header from '../../../components/Header';
import { Container, Form, Picker, TitleForm, Input } from './styles';

import { useAuth } from '../../../hooks/auth';

const recipients = ['Universidade Federal do Ceará'];

const Manifestation: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const { user } = useAuth();
  const msgInputRef = useRef<TextInput>(null);
  const [msg, setMsg] = useState('');
  const [recipient, setRecipient] = useState<string>('Selecione uma seção');

  const handleSendMsg = useCallback(
    (currentUser, selectedRecipient, message) => {
      navigate('manifestationConfirmation', {
        manifestation: {
          user: currentUser,
          recipient: selectedRecipient,
          message,
        },
      });
    },
    [navigate],
  );

  return (
    <>
      <Header
        title="Registrar Manifestação"
        backAction={<Appbar.BackAction onPress={goBack} />}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Form>
              <TitleForm>Sua opinião é muito importante</TitleForm>
              <Picker
                value={recipient}
                items={recipients}
                onSelected={(item: string) => setRecipient(item)}
              />

              <Input
                ref={msgInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                label="Digite aqui sua mensagem"
                multiline
                value={msg}
                onChangeText={text => setMsg(text)}
                returnKeyType="send"
                onSubmitEditing={() => {
                  handleSendMsg(user, recipient, msg);
                }}
              />
              <Button
                mode="text"
                color="#fff"
                compact
                onPress={() => handleSendMsg(user, recipient, msg)}
              >
                Enviar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Manifestation;
