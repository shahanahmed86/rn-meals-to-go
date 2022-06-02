import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { RestaurantDetailsScreen, RestaurantsScreen } from '../../features/restaurants/screens';
import { restaurantContext } from '../../context';

const { RestaurantProvider } = restaurantContext;
const RestaurantStack = createStackNavigator();

const screenOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  headerShown: false,
  gestureEnabled: true,
};

function RestaurantsNavigator() {
  return (
    <RestaurantProvider>
      <RestaurantStack.Navigator screenOptions={screenOptions} initialRouteName="RestaurantsList">
        <RestaurantStack.Screen name="RestaurantsList" component={RestaurantsScreen} />
        <RestaurantStack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
      </RestaurantStack.Navigator>
    </RestaurantProvider>
  );
}

export default RestaurantsNavigator;
