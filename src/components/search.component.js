import React from 'react';
import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
import { SearchContainer } from '../features/restaurants/screens/restaurant.styles';
import { restaurantContext } from '../context';

const { withRestaurantContext, actions } = restaurantContext;

function Search({ restaurantStore, restaurantDispatch }) {
  const { searchText } = restaurantStore;
  const handleSearch = text => restaurantDispatch({ type: actions.SEARCH_RESTAURANTS, payload: text });

  return (
    <SearchContainer>
      <Searchbar placeholder="Search for a location..." onChangeText={handleSearch} value={searchText} />
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
