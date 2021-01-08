import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { Select } from 'teaset';

import { width } from '../../../util/dimensions';

export const Picker = styled(Select)`
  height: 60px;
`;

export const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Form = styled.View`
  height: 65%;
  width: ${`${width * 0.9}px`};
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;

  padding: 20px;
  border-radius: 10px;

  background: #0b7dee;
`;

export const TitleForm = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: RobotoSlab_Medium;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
`;

export const Input = styled(TextInput)`
  height: 100px;
  background: #fff;
`;
