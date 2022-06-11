import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Spacer, Search, FavoritesBar } from '../../../components';
import { FadeInView } from '../../../animations';
import { RestaurantInfoCard } from '../components';
import { RestaurantList, LoaderComponent } from './restaurant.styles';
import { SafeArea } from '../../../components';

import { restaurantContext } from '../../../context';

const { withRestaurantContext } = restaurantContext;
function RestaurantsScreen({ restaurantStore, navigation }) {
  const { loadingRestaurants, restaurants, favorites } = restaurantStore;
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      <Search onFavoritesToggle={() => setIsToggled(!isToggled)} isFavoritesToggled={isToggled} />
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
    favorites: PropTypes.array.isRequired,
  }),
  navigation: PropTypes.object.isRequired,
};

export default withRestaurantContext(RestaurantsScreen);
