import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, RegisterScreen, LoginScreen } from '../../features/account/screens';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="MainScreen">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
