import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialFavoriteState, favoriteReducer } from './favorite.reducer';
import { favoriteActions } from './favorite.actions';
import { withAppContext } from '@meals-to-go/context/app';

const { Provider, Consumer } = createContext();

export const withFavoriteContext = Component => props => {
  return <Consumer>{value => <Component {...value} {...props} />}</Consumer>;
};

function FavoriteProvider({ appStore, children }) {
  const [store, dispatch] = useReducer(favoriteReducer, initialFavoriteState);

  const addToFavorites = async (restaurant, uid) => {
    try {
      const storedFavorites = await AsyncStorage.getItem(`@favorites-${uid}`).then(JSON.parse);

      let jsonValue = JSON.stringify([restaurant]);
      if (Array.isArray(storedFavorites)) jsonValue = JSON.stringify(storedFavorites.concat(restaurant));

      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);

      dispatch({ type: favoriteActions.ADD_TO_FAVORITES, payload: restaurant });
    } catch (e) {
      console.log('error adding', e);
    }
  };

  const removeFromFavorites = async (restaurant, uid) => {
    try {
      const isMatched = store.restaurants.some(r => r.placeId === restaurant.placeId);
      if (!isMatched) return;

      const storedFavorites = await AsyncStorage.getItem(`@favorites-${uid}`).then(JSON.parse);
      if (!Array.isArray(storedFavorites)) return;

      const isFound = storedFavorites.some(favorite => favorite.placeId === restaurant.placeId);
      if (!isFound) return;

      const filteredFavorites = storedFavorites.filter(favorite => favorite.placeId !== restaurant.placeId);

      const jsonValue = JSON.stringify(filteredFavorites);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);

      dispatch({ type: favoriteActions.REMOVE_FROM_FAVORITES, payload: filteredFavorites });
    } catch (e) {
      console.log('error adding', e);
    }
  };

  const loadFavorites = useCallback(uid => {
    (async () => {
      try {
        const payload = await AsyncStorage.getItem(`@favorites-${uid}`).then(JSON.parse);
        if (Array.isArray(payload)) dispatch({ type: favoriteActions.LOAD_FAVORITES, payload });
      } catch (e) {
        console.log('error loading', e);
      }
    })();
  }, []);

  useEffect(() => {
    if (appStore.isAuthenticated) loadFavorites(appStore.user.uid);
  }, [loadFavorites, appStore.isAuthenticated, appStore.user]);

  return (
    <Provider
      value={{
        appStore,
        favoriteStore: store,
        favoriteDispatch: dispatch,
        addToFavorites,
        removeFromFavorites,
      }}>
      {children}
    </Provider>
  );
}

FavoriteProvider.propTypes = {
  children: PropTypes.element.isRequired,
  appStore: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withAppContext(FavoriteProvider);
