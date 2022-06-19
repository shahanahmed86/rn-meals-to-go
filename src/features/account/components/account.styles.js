import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { theme } from '@meals-to-go/infrastructure/theme';

export const AccountBackground = styled(ImageBackground).attrs({
  source: require('@meals-to-go/assets/home_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${props => props.theme.space[2]};
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${props => props.theme.space[4]};
  margin-top: ${props => props.theme.space[2]};
  max-width: 300px;
`;

export const AuthButton = styled(Button).attrs({
  color: theme.colors.brand.primary,
})`
  padding: ${props => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 235px;
`;

export const Title = styled.Text`
  font-size: ${props => props.theme.sizes[2]};
`;

export const ErrorContainer = styled.Text`
  max-width: 250px;
  align-items: center;
  align-self: center;
  margin-vertical: ${props => props.theme.space[2]};
`;
