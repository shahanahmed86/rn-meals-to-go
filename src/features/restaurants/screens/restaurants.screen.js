import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Spacer, Search, FavoritesBar } from '@meals-to-go/components';
import { FadeInView } from '@meals-to-go/animations';
import { RestaurantInfoCard } from '../components';
import { RestaurantList, LoaderComponent } from './restaurant.styles';
import { SafeArea } from '@meals-to-go/components';

import { withRestaurantContext } from '@meals-to-go/context';

function RestaurantsScreen({ restaurantStore, favoriteStore, handleSearchRestaurant, navigation }) {
  const { loadingRestaurants, restaurants, searchText } = restaurantStore;
  const { favorites } = favoriteStore;

  const [isToggled, setIsToggled] = useState(false);
  return (
    <SafeArea>
      <Search
        search={searchText}
        handleSearch={handleSearchRestaurant}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
        isFavoritesToggled={isToggled}
      />
      {isToggled && <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />}
      {loadingRestaurants ? (
        <LoaderComponent>
          <ActivityIndicator size="large" color={Colors.blue300} />
        </LoaderComponent>
      ) : (
        <FadeInView>
          <RestaurantList
            data={restaurants}
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
      )}
    </SafeArea>
  );
}

RestaurantsScreen.propTypes = {
  restaurantStore: PropTypes.shape({
    loadingRestaurants: PropTypes.bool.isRequired,
    restaurants: PropTypes.array.isRequired,
    errorLocation: PropTypes.string,
    errorRestaurants: PropTypes.string,
    searchText: PropTypes.string.isRequired,
  }),
  favoriteStore: PropTypes.shape({
    favorites: PropTypes.array.isRequired,
  }),
  navigation: PropTypes.object.isRequired,
  handleSearchRestaurant: PropTypes.func.isRequired,
};

export default withRestaurantContext(RestaurantsScreen);
