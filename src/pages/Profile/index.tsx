import React, { useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { List, Divider, Avatar } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import { AvatarContainer } from './styles';

const Profile: React.FC = () => {
  const { user, forgotPassword, signOut } = useAuth();

  const handleChangePassword = useCallback(
    userEmail => {
      forgotPassword(userEmail);
    },
    [forgotPassword],
  );

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <Header title="Minha conta" />

      <AvatarContainer>
        <Avatar.Text size={120} label={user?.name?.charAt(0).toUpperCase()} />
      </AvatarContainer>
      <List.Section style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity>
          <List.Item
            left={() => <List.Icon icon="account-circle" />}
            title="Nome completo"
            description={user.name}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <List.Item
            left={() => <List.Icon icon="card-account-details" />}
            title="CPF"
            description={user.cpf}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity>
          <List.Item
            left={() => <List.Icon icon="email" />}
            title="Email"
            description={user.email}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Mudança de senha',
              'Tem certeza que deseja solicitar a mudança de senha?',
              [
                {
                  text: 'Cancelar',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'Confirmar',
                  onPress: () => handleChangePassword(user.email),
                },
              ],
              { cancelable: false },
            )
          }
        >
          <List.Item
            left={() => <List.Icon icon="lock" />}
            title="Mudar Senha"
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={handleSignOut}>
          <List.Item left={() => <List.Icon icon="logout" />} title="Sair" />
        </TouchableOpacity>
        <Divider />
      </List.Section>
    </>
  );
};

export default Profile;
