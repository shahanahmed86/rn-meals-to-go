import styled from 'styled-components/native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { theme } from '@meals-to-go/infrastructure/theme';

export const CartIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${props => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${props => props.theme.space[2]};
`;

export const PayButton = styled(Button).attrs({
  color: theme.colors.brand.primary,
  mode: 'contained',
  icon: 'currency-usd',
})`
  align-self: center;
  padding: ${props => props.theme.space[1]};
`;

export const ClearButton = styled(Button).attrs({
  color: theme.colors.ui.error,
  mode: 'contained',
  icon: 'cart-off',
})`
  align-self: center;
  padding: ${props => props.theme.space[1]};
`;

export const ActionsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: ${props => props.theme.space[2]};
`;
