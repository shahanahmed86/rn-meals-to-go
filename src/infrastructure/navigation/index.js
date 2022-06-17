import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import AppNavigator from './app.navigator';
import AccountNavigator from './account.navigator';
import { withAppContext } from '../../context';

import { LoaderComponent } from '../../features/restaurants/screens';

function Navigation({ appStore }) {
  const { isAuthenticated, authenticating } = appStore;

  if (authenticating) {
    return (
      <LoaderComponent>
        <ActivityIndicator size="large" color={Colors.blue300} />
      </LoaderComponent>
    );
  }

  return <NavigationContainer>{isAuthenticated ? <AppNavigator /> : <AccountNavigator />}</NavigationContainer>;
}

Navigation.propTypes = {
  appStore: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    authenticating: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withAppContext(Navigation);
