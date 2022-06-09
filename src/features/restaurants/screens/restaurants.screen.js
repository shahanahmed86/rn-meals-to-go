import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Spacer, Search, FavoritesBar } from '../../../components';
import { RestaurantInfoCard } from '../components';
import { RestaurantList, LoaderComponent } from './restaurant.styles';
import { SafeArea } from '../../../components';

import { restaurantContext } from '../../../context';

const { withRestaurantContext } = restaurantContext;
function RestaurantsScreen({ appStore, restaurantStore, navigation }) {
  const { loadingRestaurants, restaurants, favorites } = restaurantStore;
  const { isAndroid } = appStore;
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      <Search onFavoritesToggle={() => setIsToggled(!isToggled)} isFavoritesToggled={isToggled} />
      {isToggled && <FavoritesBar favorites={favorites} isAndroid={isAndroid} onNavigate={navigation.navigate} />}
      {loadingRestaurants ? (
        <LoaderComponent>
          <ActivityIndicator size="large" color={Colors.blue300} />
        </LoaderComponent>
      ) : (
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
      )}
    </SafeArea>
  );
}

RestaurantsScreen.propTypes = {
  restaurantStore: PropTypes.shape({
    loadingRestaurants: PropTypes.bool.isRequired,
    restaurants: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
  }),
  appStore: PropTypes.shape({
    isAndroid: PropTypes.bool.isRequired,
  }),
  navigation: PropTypes.object.isRequired,
};

export default withRestaurantContext(RestaurantsScreen);
