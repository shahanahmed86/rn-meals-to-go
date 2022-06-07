import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { appContext } from '../../../context';

const { withAppContext } = appContext;
function SettingsScreen({ appStore, onLogout }) {
  const { authenticating } = appStore;
  return (
    <View>
      <Text>Settings!</Text>
      <Button disabled={authenticating} mode="contained" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
}

SettingsScreen.propTypes = {
  appStore: PropTypes.shape({
    authenticating: PropTypes.bool.isRequired,
    authError: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withAppContext(SettingsScreen);
