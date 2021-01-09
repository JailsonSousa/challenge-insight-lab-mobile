import styled from 'styled-components/native';
import { width } from '../../util/dimensions';

export const Section = styled.View`
  width: ${`${width * 0.8}px`};
  padding: 15px;
  margin: 15px 0px;
  border: 0.5px solid #0b7dee;
  border-radius: 5px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  font-family: RobotoSlab_Medium;
  text-align: center;
  text-transform: uppercase;
  color: #0b7dee;
`;

export const TitleSection = styled.Text`
  font-size: 16px;
  font-weight: 600;
  font-family: RobotoSlab_Medium;
  text-transform: uppercase;
  position: absolute;
  top: -12px;
  left: 8px;
  padding: 0 5px;
  background: #ebecf1;
  color: #0b7dee;
`;

export const Item = styled.View``;

export const ItemText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  font-family: RobotoSlab_Medium;
  color: #282828;

  margin: 3px 0;
`;

export const ItemDescription = styled.Text`
  font-family: RobotoSlab_Regular;
  text-align: justify;
  color: #646464;
`;
