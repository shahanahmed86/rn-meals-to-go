import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { withRestaurantContext } from '../../../context';
import { SafeArea, Text, Spacer } from '../../../components';
import { RestaurantList } from '../../restaurants/screens';
import { RestaurantInfoCard } from '../../restaurants/components';
import { FadeInView } from '../../../animations';

const NoFavoritesSafeArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

function FavoritesScreen({ favoriteStore, navigation }) {
  const { favorites } = favoriteStore;
  if (!favorites.length) {
    return (
      <NoFavoritesSafeArea>
        <Text center>No Favorites yet</Text>
      </NoFavoritesSafeArea>
    );
  }
  return (
    <SafeArea>
      <FadeInView>
        <RestaurantList
          data={favorites}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}>
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(_, i) => i}
        />
      </FadeInView>
    </SafeArea>
  );
}

FavoritesScreen.propTypes = {
  favoriteStore: PropTypes.shape({
    favorites: PropTypes.array.isRequired,
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRestaurantContext(FavoritesScreen);
