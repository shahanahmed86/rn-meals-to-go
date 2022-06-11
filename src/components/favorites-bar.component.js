import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, ScrollView } from 'react-native';

import styled from 'styled-components/native';
import CompactRestaurantInfo from './compact-restaurant-info.component';
import Spacer from './spacer.component';
import Text from './text.component';

const FavoritesWrapper = styled(View)`
  padding: 10px;
`;

function FavoritesBar({ favorites, onNavigate }) {
  if (!favorites.length) return null;
  return (
    <FavoritesWrapper>
      <Spacer variant="left.large">
        <Text variant="caption">Favorites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((favorite, i) => (
          <Spacer key={`${favorite.name}-${i}`} position="left" size="medium">
            <TouchableOpacity onPress={() => onNavigate('RestaurantDetails', { restaurant: favorite })}>
              <CompactRestaurantInfo restaurant={favorite} />
            </TouchableOpacity>
          </Spacer>
        ))}
      </ScrollView>
    </FavoritesWrapper>
  );
}

FavoritesBar.propTypes = {
  favorites: PropTypes.array.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default FavoritesBar;
