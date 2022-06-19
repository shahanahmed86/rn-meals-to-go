import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { initialRestaurantState, restaurantReducer } from './restaurant.reducer';
import { restaurantsRequest, restaurantsTransform } from '@meals-to-go/services/restaurants/restaurants.service';
import { restaurantActions } from './restaurant.actions';
import { withFavoriteContext } from '@meals-to-go/context/favorites';
import { useDebounce } from '@meals-to-go/hooks';
import { locationRequest, locationTransform } from '@meals-to-go/services/location/location.service';

const { Provider, Consumer } = createContext();

export const withRestaurantContext = Component => props => {
  return <Consumer>{value => <Component {...value} {...props} />}</Consumer>;
};

function RestaurantProvider({ appStore, favoriteStore, children }) {
  const [store, dispatch] = useReducer(restaurantReducer, initialRestaurantState);

  const retrieveRestaurants = useCallback(() => {
    if (store.location) {
      dispatch({ type: restaurantActions.LOADING_RESTAURANTS, payload: true });
      const locationString = `${store.location.lat},${store.location.lng}`;
      restaurantsRequest(locationString)
        .then(restaurantsTransform)
        .then(result => dispatch({ type: restaurantActions.FETCH_RESTAURANTS, payload: result }))
        .catch(err => dispatch({ type: restaurantActions.ERROR_RESTAURANTS, payload: err.message }));
    }
  }, [store.location]);

  const handleSearchRestaurant = text => dispatch({ type: restaurantActions.SEARCH_RESTAURANTS, payload: text });

  const debouncedSearchText = useDebounce(store.searchText);

  const retrieveLocation = useCallback(() => {
    if (debouncedSearchText) {
      dispatch({ type: restaurantActions.LOADING_LOCATION, payload: true });

      locationRequest(debouncedSearchText)
        .then(locationTransform)
        .then(result => dispatch({ type: restaurantActions.FETCH_LOCATION, payload: result }))
        .catch(err => dispatch({ type: restaurantActions.ERROR_LOCATION, payload: err.message }));
    }
  }, [debouncedSearchText]);

  useEffect(retrieveRestaurants, [retrieveRestaurants]);
  useEffect(retrieveLocation, [retrieveLocation]);

  return (
    <Provider
      value={{
        appStore,
        favoriteStore,
        restaurantStore: store,
        restaurantDispatch: dispatch,
        handleSearchRestaurant,
      }}>
      {children}
    </Provider>
  );
}

RestaurantProvider.propTypes = {
  appStore: PropTypes.object.isRequired,
  favoriteStore: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withFavoriteContext(RestaurantProvider);
