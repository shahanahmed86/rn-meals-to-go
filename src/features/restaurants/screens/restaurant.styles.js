import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { SafeAreaView, View } from 'react-native';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const SearchContainer = styled(View)`
  padding: ${props => props.theme.space[3]};
`;

export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const LoaderComponent = styled(SafeArea)`
  justify-content: center;
  align-items: center;
`;
