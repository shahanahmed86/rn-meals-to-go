import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { restaurantContext } from '../context';

const { withRestaurantContext } = restaurantContext;

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
`;

function Favorite({ appStore, restaurantStore, addToFavorites, removeFromFavorites, restaurant }) {
  const { favorites } = restaurantStore;
  const { user } = appStore;

  const isFavorite = useMemo(() => {
    return favorites.some(r => r.placeId === restaurant.placeId);
  }, [restaurant, favorites]);

  const toggleFavorites = isFavorite ? removeFromFavorites : addToFavorites;
  const iconName = isFavorite ? 'heart' : 'heart-outline';
  return (
    <FavoriteButton onPress={() => toggleFavorites(restaurant, user.uid)}>
      <Ionicons name={iconName} color="red" size={24} />
    </FavoriteButton>
  );
}

Favorite.propTypes = {
  restaurantStore: PropTypes.shape({
    favorites: PropTypes.array.isRequired,
  }),
  appStore: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }),
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

export default withRestaurantContext(Favorite);
