import React, { createContext, useCallback, useContext } from 'react';
import { database } from '../config/firebase';
import { distanceToNow } from '../util/date';

export interface NotificationProps {
  uid: string;
  message: string;
  created_at: string;
}

interface NotificationContextData {
  getAllNotifications(): Promise<NotificationProps[]>;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

const NotificationProvider: React.FC = ({ children }: any) => {
  const getAllNotifications = useCallback(async () => {
    const notifications = await database.ref('notifications').once('value');
    const modifiedNotifications = Object.values(notifications.val()).map(
      (current: NotificationProps) => {
        Object.assign(current, {
          dateFormatted: distanceToNow(current.created_at),
        });

        return current;
      },
    );

    return modifiedNotifications;
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        getAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within an NotificationProvider',
    );
  }

  return context;
}

export { NotificationProvider, useNotification };
