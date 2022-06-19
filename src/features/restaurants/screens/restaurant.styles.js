import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { View } from 'react-native';

import { SafeArea } from '@meals-to-go/components';

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
