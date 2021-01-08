import React, { createContext, useCallback, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { database } from '../config/firebase';
import * as RootNavigation from '../services/RootNavigation';
import { UserProps } from './auth';

export interface ManifestationProps {
  uid?: string;
  user: UserProps;
  recipient: string;
  message: string;
}

interface ManifestationContextData {
  getAllManifestations(): Promise<void>;
  createManifestation(manifestation: ManifestationProps): Promise<void>;
}

const ManifestationContext = createContext<ManifestationContextData>(
  {} as ManifestationContextData,
);

const ManifestationProvider: React.FC = ({ children }: any) => {
  const getAllManifestations = useCallback(async () => {
    console.log('hello');
  }, []);

  const createManifestation = useCallback(
    async ({ user, recipient, message }) => {
      const created_at = format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss");
      const uid = database.ref().push().ref.key as string;

      const createNewNotification = database.ref(`notifications/${uid}`).set({
        uid,
        message: `Manifestação para a instituição ${recipient} foi cadastrada com sucesso`,
        created_at,
      });

      const createNewManifestation = database.ref(`manifestations/${uid}`).set({
        uid,
        userID: user.uid,
        manifest_code: '#'.concat(uid.slice(0, 7).toUpperCase()),
        recipient,
        message,
        created_at,
      });

      Promise.all([createNewManifestation, createNewNotification]).then(() => {
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
      });
    },
    [],
  );

  return (
    <ManifestationContext.Provider
      value={{
        getAllManifestations,
        createManifestation,
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
