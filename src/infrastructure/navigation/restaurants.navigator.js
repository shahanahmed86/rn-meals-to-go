import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { RestaurantDetailsScreen, RestaurantsScreen } from '@meals-to-go/features/restaurants/screens';

const RestaurantStack = createStackNavigator();

const screenOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  headerShown: false,
  // gestureEnabled: true, // if enabled then inside of ScrollView all the items are expanded then scroll not work.
};

function RestaurantsNavigator() {
  return (
    <RestaurantStack.Navigator screenOptions={screenOptions} initialRouteName="RestaurantsList">
      <RestaurantStack.Screen name="RestaurantsList" component={RestaurantsScreen} />
      <RestaurantStack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
    </RestaurantStack.Navigator>
  );
}

export default RestaurantsNavigator;
