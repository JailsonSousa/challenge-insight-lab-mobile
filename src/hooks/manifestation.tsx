import React, { createContext, useCallback, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { database } from '../config/firebase';
import * as RootNavigation from '../services/RootNavigation';
import { UserProps } from './auth';
import { distanceToNow } from '../util/date';

export interface ManifestationProps {
  uid?: string;
  user: UserProps;
  recipient: string;
  message: string;
  created_at?: string;
}

interface ManifestationContextData {
  loadingManifestation: boolean;
  getAllManifestations(userID: string): Promise<ManifestationProps[]>;
  createManifestation(manifestation: ManifestationProps): Promise<void>;
  deleteManifestation(manifestationID: string): Promise<void>;
}

const ManifestationContext = createContext<ManifestationContextData>(
  {} as ManifestationContextData,
);

const ManifestationProvider: React.FC = ({ children }: any) => {
  const [loadingManifestation, setLoadingManifestation] = useState(false);
  const getAllManifestations = useCallback(async userID => {
    const manifestations = await database
      .ref()
      .child('manifestations')
      .orderByChild('userID')
      .equalTo(userID)
      .once('value');

    if (manifestations.val()) {
      const modifiedManifestations = Object.values(manifestations.val()).map(
        (current: ManifestationProps) => {
          Object.assign(current, {
            dateFormatted: distanceToNow(current.created_at as string),
          });

          return current;
        },
      );

      return modifiedManifestations;
    }

    return [] as ManifestationProps[];
  }, []);

  const deleteManifestation = useCallback(manifestaionID => {
    const deleteManifestaionPromise = database
      .ref(`manifestations/${manifestaionID}`)
      .remove();

    const deleteNotificationPromise = database
      .ref(`notifications/${manifestaionID}`)
      .remove();

    Promise.all([deleteManifestaionPromise, deleteNotificationPromise])
      .then(() =>
        Alert.alert(
          'Operação realizada com sucesso.',
          'Manifestação removida com sucesso!',
        ),
      )
      .catch(err =>
        Alert.alert(
          'Ops, Ocorreu algum erro.',
          'Aconteceu algum problema ao realizar essa operação.\nCaso o erro continue contate o suporte.',
        ),
      );
  }, []);

  const createManifestation = useCallback(
    async ({ user, recipient, message }) => {
      setLoadingManifestation(true);
      const created_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      const uid = database.ref().push().ref.key as string;
      const manifest_code = '#'.concat(uid.slice(0, 7).toUpperCase());

      const createNewNotification = database.ref(`notifications/${uid}`).set({
        uid,
        userID: user.uid,
        message: `A Manifestação ${manifest_code} foi cadastrado para a instituição ${recipient} com sucesso!`,
        created_at,
      });

      const createNewManifestation = database.ref(`manifestations/${uid}`).set({
        uid,
        userID: user.uid,
        manifest_code,
        recipient,
        message,
        created_at,
      });

      Promise.all([createNewManifestation, createNewNotification])
        .then(() => {
          Alert.alert(
            'Operação realizada com sucesso.',
            'Sua manifestação foi salva com sucesso!',
            [
              {
                text: 'Ok',
                onPress: () => RootNavigation.navigate('main'),
              },
            ],
            { cancelable: false },
          );
        })
        .finally(() => setLoadingManifestation(false));
    },
    [],
  );

  return (
    <ManifestationContext.Provider
      value={{
        loadingManifestation,
        getAllManifestations,
        createManifestation,
        deleteManifestation,
      }}
    >
      {children}
    </ManifestationContext.Provider>
  );
};

function useManifestation(): ManifestationContextData {
  const context = useContext(ManifestationContext);

  if (!context) {
    throw new Error(
      'useManifestation must be used within an ManifestationProvider',
    );
  }

  return context;
}

export { ManifestationProvider, useManifestation };
