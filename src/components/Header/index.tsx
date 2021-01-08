import React, { ReactNode } from 'react';

import { Appbar } from 'react-native-paper';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  backAction?: ReactNode;
  action?: ReactNode;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  backAction,
  action,
  title,
}: HeaderProps) => {
  const { user } = useAuth();

  return (
    <Appbar.Header>
      {backAction}
      <Appbar.Content title={title} subtitle={user.name} />
      {action}
    </Appbar.Header>
  );
};

export default Header;
