import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { restaurantContext } from '../../../context';

const { withRestaurantContext, actions } = restaurantContext;

export const SearchContainer = styled(View)`
  padding: ${props => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

function Search({ restaurantStore, restaurantDispatch }) {
  const { searchText } = restaurantStore;
  const handleSearch = text => restaurantDispatch({ type: actions.SEARCH_RESTAURANTS, payload: text });

  return (
    <SearchContainer>
      <Searchbar icon="map" placeholder="Search for a location..." onChangeText={handleSearch} value={searchText} />
    </SearchContainer>
  );
}

Search.propTypes = {
  restaurantStore: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
  }),
  restaurantDispatch: PropTypes.func.isRequired,
};

export default withRestaurantContext(Search);
