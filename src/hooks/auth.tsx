import React, { createContext, useCallback, useState, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../config/firebase';
import * as RootNavigation from '../services/RootNavigation';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export interface UserProps {
  uid: string;
  name: string;
  cpf: string;
  email: string;
}

interface AuthContextData {
  user: UserProps;
  loadingAuth: boolean;
  signIn(credentialsSignIn: SignInCredentials): Promise<void>;
  signUp(user: SignUpProps): Promise<void>;
  signOut(): void;
  forgotPassword(email: string): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<UserProps>({} as UserProps);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const signIn = useCallback(async ({ email, password }) => {
    setLoadingAuth(true);
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        const uid = res.user?.uid as string;
        database
          .ref()
          .child(`users/${uid}`)
          .once('value')
          .then(async snapshot => {
            const user = snapshot.val();
            await AsyncStorage.setItem(
              '@simplifique:user',
              JSON.stringify(user),
            );
            setCurrentUser(user as UserProps);
            RootNavigation.navigate('main');
          });
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/user-not-found': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Parece que não existe nenhum cadastro com esse email. \n\nEmail: ${email}`,
            );
            break;
          }

          case 'auth/user-disabled': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Parece que essa conta está desativada. \n\nEmail: ${email}`,
            );
            break;
          }

          case 'auth/wrong-password': {
            Alert.alert('Ops, ocorreu um erro!', 'Senha incorreta.');
            break;
          }

          case 'auth/invalid-email': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Parece que o email é inválido. \n\nEmail: ${email}`,
            );
            break;
          }

          case 'operation-not-allowed': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Esse tipo de operação não é permitida.`,
            );
            break;
          }

          case 'auth/weak-password': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `A senha que você informou é muito fraca. \nTente utilizar uma senha com pelo menos 6 digitos.`,
            );
            break;
          }

          default: {
            Alert.alert(
              'Ops, ocorreu um erro!',
              'Aconteceu algum erro inesperado.\nEntre em contato com o suporte técnico.',
            );
            break;
          }
        }
      })
      .finally(() => {
        setLoadingAuth(false);
      });
  }, []);

  const signUp = useCallback(async ({ name, cpf, email, password }) => {
    setLoadingAuth(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        const uid = res.user?.uid;
        await res.user?.updateProfile({
          displayName: name,
        });

        await database.ref(`users/${uid}`).set({
          uid,
          name,
          cpf,
          email,
        });
      })
      .then(() => {
        Alert.alert(
          'Cadastro de usuário.',
          'O Seu cadastro foi realizado com sucesso!',
          [
            {
              text: 'Ok',
              onPress: () => RootNavigation.navigate('signin'),
            },
          ],
          { cancelable: false },
        );
      })
      .catch(err => {
        switch (err.code) {
          case 'auth/email-already-in-use': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Parece que o email informado já está em uso. \n\nEmail: ${email}`,
            );
            break;
          }

          case 'auth/invalid-email': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Parece que o email é inválido. \n\nEmail: ${email}`,
            );
            break;
          }

          case 'operation-not-allowed': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `Esse tipo de operação não é permitida.`,
            );
            break;
          }

          case 'auth/weak-password': {
            Alert.alert(
              'Ops, ocorreu um erro!',
              `A senha que você informou é muito fraca. \nTente utilizar uma senha com pelo menos 6 digitos.`,
            );
            break;
          }

          default: {
            Alert.alert(
              'Ops, ocorreu um erro!',
              'Aconteceu algum erro inesperado.\nEntre em contato com o suporte técnico.',
            );
            break;
          }
        }
      })
      .finally(() => setLoadingAuth(false));
  }, []);

  const signOut = useCallback(async () => {
    await auth.signOut().then(async () => {
      await AsyncStorage.removeItem('@simplifique:user');
      setCurrentUser({} as UserProps);
      RootNavigation.navigate('signin');
    });
  }, []);

  const forgotPassword = useCallback(async email => {
    await auth
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Recuperação de senha',
          `O link de recueração de senha foi enviado para o email: ${email} \n\nObs: Não deixe de verificar no spam.`,
        ),
      )
      .catch(() =>
        Alert.alert(
          'Ops, ocorreu um erro!',
          `Parece que o email informado não é válido. \n\nEmail: ${email}`,
        ),
      );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        forgotPassword,
        user: currentUser,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
