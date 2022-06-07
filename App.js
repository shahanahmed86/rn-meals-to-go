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
import { appContext, restaurantContext } from './src/context';
import Navigation from './src/infrastructure/navigation';

const { AppProvider } = appContext;
const { RestaurantProvider } = restaurantContext;

function App() {
  useEffect(() => {
    changeKeepAwake(true);
    return () => changeKeepAwake(false);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <PaperProvider>
          <RestaurantProvider>
            <Navigation />
          </RestaurantProvider>
        </PaperProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
