import React from 'react';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SettingsScreen, FavoritesScreen } from '../../features/settings/screens';

const SettingsStack = createStackNavigator();

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={screenOptions} initialRouteName="SettingsList">
      <SettingsStack.Screen options={{ headerShown: false }} name="SettingsList" component={SettingsScreen} />
      <SettingsStack.Screen name="Favorites" component={FavoritesScreen} />
    </SettingsStack.Navigator>
  );
}

export default SettingsNavigator;
