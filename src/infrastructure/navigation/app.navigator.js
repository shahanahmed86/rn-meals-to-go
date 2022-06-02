import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestaurantsNavigator from './restaurants.navigator';

const TAB_ICONS = {
  Restaurants: 'restaurant',
  Map: 'map',
  Settings: 'settings',
};

function MapScreen() {
  return (
    <View>
      <Text>Map!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings!</Text>
    </View>
  );
}

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
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions} initialRouteName="Restaurants">
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
