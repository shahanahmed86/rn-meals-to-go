import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import { Card } from 'react-native-paper';

export const RestaurantCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: ${props => props.theme.sizes[0]};
`;

export const Info = styled(View)`
  padding: ${props => props.theme.space[3]};
`;

export const Section = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[2]};
`;

export const SectionEnd = styled(View)`
  flex: 1;
  justify-content: flex-end;
  flex-direction: row;
`;

export const Ratings = styled(View)`
  flex-direction: row;
`;

export const Icon = styled(Image)`
  height: 15px;
  width: 15px;
`;
