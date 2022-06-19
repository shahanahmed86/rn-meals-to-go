import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CheckoutScreen, CheckoutSuccessScreen, CheckoutErrorScreen } from '@meals-to-go/features/checkout/screens';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

function CheckoutNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="CheckoutScreen">
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccessScreen} />
      <Stack.Screen name="CheckoutError" component={CheckoutErrorScreen} />
    </Stack.Navigator>
  );
}

export default CheckoutNavigator;
