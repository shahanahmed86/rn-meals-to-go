import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app.navigator';
import AccountNavigator from './account.navigator';
import { appContext } from '../../context';

const { withAppContext } = appContext;

function Navigation({ appStore }) {
  const { user } = appStore;
  return <NavigationContainer>{user ? <AppNavigator /> : <AccountNavigator />}</NavigationContainer>;
}

Navigation.propTypes = {
  appStore: PropTypes.shape({
    user: PropTypes.object,
    authenticating: PropTypes.bool.isRequired,
    authError: PropTypes.string,
  }).isRequired,
};

export default withAppContext(Navigation);
