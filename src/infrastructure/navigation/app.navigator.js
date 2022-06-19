import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RestaurantsNavigator from './restaurants.navigator';
import SettingsNavigator from './settings.navigator';
import CheckoutNavigator from './checkout.navigator';
import { MapScreen } from '../../features/map/screens';
import { FavoriteProvider, RestaurantProvider, CartProvider } from '../../context';
import { theme } from '../../infrastructure/theme';

const TAB_ICONS = {
  Restaurants: 'restaurant',
  Checkout: 'cart',
  Map: 'map',
  Settings: 'settings',
};

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICONS[route.name];
  return {
    tabBarIcon: ({ color, size }) => <Ionicons name={iconName} size={size} color={color} />,
    tabBarActiveTintColor: theme.colors.brand.primary,
    tabBarInactiveTintColor: theme.colors.brand.muted,
    headerShown: false,
  };
};

function AppNavigator() {
  return (
    <FavoriteProvider>
      <RestaurantProvider>
        <CartProvider>
          <Tab.Navigator screenOptions={createScreenOptions} initialRouteName="Restaurants">
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Checkout" component={CheckoutNavigator} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </CartProvider>
      </RestaurantProvider>
    </FavoriteProvider>
  );
}

export default AppNavigator;
