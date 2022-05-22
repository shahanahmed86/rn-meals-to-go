/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { AppProvider } from './src/context';
import Main from './src';

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;
