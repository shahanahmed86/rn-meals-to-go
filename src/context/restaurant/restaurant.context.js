import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

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

  return <Provider value={{ appStore, restaurantStore: store, restaurantDispatch: dispatch }}>{children}</Provider>;
}

RestaurantProvider.propTypes = {
  children: PropTypes.element.isRequired,
  appStore: PropTypes.object.isRequired,
};

export default withAppContext(RestaurantProvider);
