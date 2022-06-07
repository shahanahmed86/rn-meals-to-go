import React from 'react';
import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
import { SearchContainer } from '../features/restaurants/screens/restaurant.styles';
import { restaurantContext } from '../context';

const { withRestaurantContext, actions } = restaurantContext;

function Search({ restaurantStore, restaurantDispatch, isFavoritesToggled, onFavoritesToggle }) {
  const { searchText } = restaurantStore;
  const handleSearch = text => restaurantDispatch({ type: actions.SEARCH_RESTAURANTS, payload: text });

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavoritesToggled ? 'heart' : 'heart-outline'}
        onIconPress={onFavoritesToggle}
        placeholder="Search for a location..."
        onChangeText={handleSearch}
        value={searchText}
      />
    </SearchContainer>
  );
}

Search.defaultProps = {
  isFavoritesToggled: false,
};

Search.propTypes = {
  restaurantStore: PropTypes.shape({
    searchText: PropTypes.string.isRequired,
  }),
  restaurantDispatch: PropTypes.func.isRequired,
  isFavoritesToggled: PropTypes.bool.isRequired,
  onFavoritesToggle: PropTypes.func.isRequired,
};

export default withRestaurantContext(Search);
