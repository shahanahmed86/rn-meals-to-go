import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RestaurantsNavigator from './restaurants.navigator';
import SettingsNavigator from './settings.navigator';
import { MapScreen } from '../../features/map/screens';
import { restaurantContext } from '../../context';

const { RestaurantProvider } = restaurantContext;

const TAB_ICONS = {
  Restaurants: 'restaurant',
  Map: 'map',
  Settings: 'settings',
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICONS[route.name];
  return {
    tabBarIcon: ({ color, size }) => <Ionicons name={iconName} size={size} color={color} />,
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  };
};

function AppNavigator() {
  return (
    <RestaurantProvider>
      <Tab.Navigator screenOptions={createScreenOptions} initialRouteName="Restaurants">
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </RestaurantProvider>
  );
}

export default AppNavigator;
