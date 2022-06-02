import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { RestaurantsScreen } from '../../features/restaurants/screens';
import { restaurantContext } from '../../context';

function RestaurantDetails() {
  return (
    <View>
      <Text>Restaurant Details</Text>
    </View>
  );
}

const { RestaurantProvider } = restaurantContext;
const RestaurantStack = createStackNavigator();

const screenOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  headerShown: false,
};

function RestaurantsNavigator() {
  return (
    <RestaurantProvider>
      <RestaurantStack.Navigator screenOptions={screenOptions} initialRouteName="RestaurantsList">
        <RestaurantStack.Screen name="RestaurantsList" component={RestaurantsScreen} />
        <RestaurantStack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      </RestaurantStack.Navigator>
    </RestaurantProvider>
  );
}

export default RestaurantsNavigator;
