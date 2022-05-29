import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './restaurant.reducer';
import { restaurantsRequest, restaurantsTransform } from '../../services/restaurants/restaurants.service';
import * as actions from './restaurant.actions';
import { withAppContext } from '../app';

const { Provider, Consumer } = createContext();

export const withRestaurantContext = Component => props =>
  <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function RestaurantProvider({ children }) {
  const [restaurantStore, restaurantDispatch] = useReducer(reducer, initialState);

  const retrieveRestaurants = useCallback(() => {
    restaurantDispatch({ type: actions.TOGGLE_LOADING });
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then(result => restaurantDispatch({ type: actions.FETCH_RESTAURANTS, payload: result }))
        .catch(error => restaurantDispatch({ type: actions.SET_ERROR, payload: error.message }));
    }, 700);
  }, [restaurantDispatch]);

  useEffect(retrieveRestaurants, [retrieveRestaurants]);

  return <Provider value={{ restaurantStore, restaurantDispatch }}>{children}</Provider>;
}

RestaurantProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withAppContext(RestaurantProvider);
