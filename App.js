/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { theme } from './src/infrastructure/theme';
import { AppProvider } from './src/context';
import { RestaurantsScreen } from './src/features/restaurants/screens';
import { changeKeepAwake } from './src/utils';

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
  };
};

function App() {
  useEffect(() => {
    changeKeepAwake(true);
    return () => changeKeepAwake(false);
  }, []);
  return (
    <PaperProvider>
      <AppProvider>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </AppProvider>
    </PaperProvider>
  );
}

export default App;
