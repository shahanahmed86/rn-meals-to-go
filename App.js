/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from './src/infrastructure/theme';
import { changeKeepAwake } from './src/utils';
import { appContext } from './src/context';
import Navigation from './src/infrastructure/navigation';

const { AppProvider } = appContext;

function App() {
  useEffect(() => {
    changeKeepAwake(true);
    return () => changeKeepAwake(false);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
