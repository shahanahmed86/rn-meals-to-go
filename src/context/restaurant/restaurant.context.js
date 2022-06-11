import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialState, reducer } from './restaurant.reducer';
import { restaurantsRequest, restaurantsTransform } from '../../services/restaurants/restaurants.service';
import * as actions from './restaurant.actions';
import { withAppContext } from '../app';
import { useDebounce } from '../../hooks';
import { locationRequest, locationTransform } from '../../services/location/location.service';

const { Provider, Consumer } = createContext();

export const withRestaurantContext = Component => props =>
  <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function RestaurantProvider({ appStore, children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  const retrieveRestaurants = useCallback(() => {
    if (store.location) {
      dispatch({ type: actions.LOADING_RESTAURANTS, payload: true });
      const locationString = `${store.location.lat},${store.location.lng}`;
      restaurantsRequest(locationString)
        .then(restaurantsTransform)
        .then(result => dispatch({ type: actions.FETCH_RESTAURANTS, payload: result }))
        .catch(error => dispatch({ type: actions.ERROR_RESTAURANTS, payload: error.message }));
    }
  }, [store.location]);

  const debouncedSearchText = useDebounce(store.searchText);

  const retrieveLocation = useCallback(() => {
    if (debouncedSearchText) {
      dispatch({ type: actions.LOADING_LOCATION, payload: true });

      locationRequest(debouncedSearchText.toLowerCase())
        .then(locationTransform)
        .then(result => dispatch({ type: actions.FETCH_LOCATION, payload: result }))
        .catch(err => dispatch({ type: actions.ERROR_LOCATION, payload: err.message }));
    }
  }, [debouncedSearchText]);

  useEffect(retrieveRestaurants, [retrieveRestaurants]);
  useEffect(retrieveLocation, [retrieveLocation]);

  const addToFavorites = async (restaurant, uid) => {
    try {
      const storedFavorites = await AsyncStorage.getItem(`@favorites-${uid}`).then(JSON.parse);

      let jsonValue = JSON.stringify([restaurant]);
      if (Array.isArray(storedFavorites)) jsonValue = JSON.stringify(storedFavorites.concat(restaurant));

      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);

      dispatch({ type: actions.ADD_TO_FAVORITES, payload: restaurant });
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

      dispatch({ type: actions.REMOVE_FROM_FAVORITES, payload: filteredFavorites });
    } catch (e) {
      console.log('error adding', e);
    }
  };

  const loadFavorites = useCallback(uid => {
    (async () => {
      try {
        const payload = await AsyncStorage.getItem(`@favorites-${uid}`).then(JSON.parse);
        if (Array.isArray(payload)) dispatch({ type: actions.LOAD_FAVORITES, payload });
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
      value={{ appStore, restaurantStore: store, restaurantDispatch: dispatch, addToFavorites, removeFromFavorites }}>
      {children}
    </Provider>
  );
}

RestaurantProvider.propTypes = {
  children: PropTypes.element.isRequired,
  appStore: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withAppContext(RestaurantProvider);
