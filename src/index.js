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
import SplashScreen from 'react-native-splash-screen';

import { theme } from './infrastructure/theme';
import { changeKeepAwake } from './utils';
import { AppProvider } from './context';
import Navigation from './infrastructure/navigation';

function App() {
  useEffect(() => {
    changeKeepAwake(true);
    SplashScreen.hide();
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
