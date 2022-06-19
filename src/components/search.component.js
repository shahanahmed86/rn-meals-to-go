import React from 'react';
import PropTypes from 'prop-types';
import { Searchbar } from 'react-native-paper';
import { SearchContainer } from '@meals-to-go/features/restaurants/screens/restaurant.styles';

function Search({ search, handleSearch, isFavoritesToggled, onFavoritesToggle }) {
  return (
    <SearchContainer>
      <Searchbar
        icon={isFavoritesToggled ? 'heart' : 'heart-outline'}
        onIconPress={onFavoritesToggle}
        placeholder="Search for a location..."
        onChangeText={handleSearch}
        value={search}
      />
    </SearchContainer>
  );
}

Search.defaultProps = {
  isFavoritesToggled: false,
};

Search.propTypes = {
  search: PropTypes.string.isRequired,
  isFavoritesToggled: PropTypes.bool.isRequired,
  onFavoritesToggle: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
