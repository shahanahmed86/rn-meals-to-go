import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SafeAreaView, Platform, StatusBar, Text } from 'react-native';
import { colors } from './utils';
import { withAppContext } from './context';

function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: colors.darkBlue,
  },
  text: {
    color: colors.white,
  },
});

Main.propTypes = {
  currentSubject: PropTypes.string,
};

export default withAppContext(Main);
