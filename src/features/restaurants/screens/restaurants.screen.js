import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Spacer, Search } from '../../../components';
import { RestaurantInfoCard } from '../components';
import { SafeArea, RestaurantList, LoaderComponent } from './restaurant.styles';

import { restaurantContext } from '../../../context';

const { withRestaurantContext } = restaurantContext;
function RestaurantsScreen({ restaurantStore, navigation }) {
  const { loadingRestaurants, restaurants } = restaurantStore;
  return (
    <SafeArea>
      <Search />
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
  }),
  navigation: PropTypes.object.isRequired,
};

export default withRestaurantContext(RestaurantsScreen);
