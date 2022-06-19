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

// absolute url @meals-to-go = ./src
import { theme } from '@meals-to-go/infrastructure/theme';
import { changeKeepAwake } from '@meals-to-go/utils';
import { AppProvider } from '@meals-to-go/context';
import Navigation from '@meals-to-go/infrastructure/navigation';

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
