import styled from 'styled-components/native';
import { width } from '../../util/dimensions';

export const Wrapper = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  justify-content: space-between;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 600;
  font-family: RobotoSlab_Medium;
  text-transform: uppercase;
  color: #0b7dee;
`;

export const Subtitle = styled.Text`
  text-align: center;
  width: ${`${width * 0.7}px`};
  font-family: RobotoSlab_Regular;
  color: #282828;
`;

export const Form = styled.View`
  height: 60%;
  width: ${`${width * 0.9}px`};
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 20px;
  border-radius: 10px;

  background: #0b7dee;
`;

export const TextForm = styled.Text`
  font-family: RobotoSlab_Regular;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
`;

export const GoBackText = styled.Text`
  text-align: center;
  font-family: RobotoSlab_Regular;
  color: #282828;
`;
