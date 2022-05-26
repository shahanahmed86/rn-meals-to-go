import React, { createContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './reducer';
import { restaurantsRequest, restaurantsTransform } from '../services/restaurants/restaurants.service';
import { actions } from '.';

const { Provider, Consumer } = createContext();

export const withAppContext = Component => props => <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function AppProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  const retrieveRestaurants = useCallback(() => {
    dispatch({ type: actions.TOGGLE_LOADING });
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then(result => dispatch({ type: actions.FETCH_RESTAURANTS, payload: result }))
        .catch(error => dispatch({ type: actions.SET_ERROR, payload: error.message }))
        .finally(() => dispatch({ type: actions.TOGGLE_LOADING }));
    }, 700);
  }, []);

  useEffect(retrieveRestaurants, [retrieveRestaurants]);

  return <Provider value={{ ...store, dispatch }}>{children}</Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
