import React from 'react';

import AppNavigator from './app.navigator';
import { restaurantContext } from '../../context';

const { RestaurantProvider } = restaurantContext;

function Navigation() {
  return (
    <RestaurantProvider>
      <AppNavigator />
    </RestaurantProvider>
  );
}

export default Navigation;
