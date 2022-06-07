import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './app.reducer';
import * as actions from './app.actions';
import { loginRequest } from '../../services/authentication/authentication.service';

const { Provider, Consumer } = createContext();

export const withAppContext = Component => props => <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function AppProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  const onLogin = useCallback((email, password) => {
    dispatch({ type: actions.LOADING_AUTH, payload: true });

    loginRequest(email, password)
      .then(user => {
        dispatch({ type: actions.ON_AUTH, payload: user });
      })
      .catch(e => {
        dispatch({ type: actions.AUTH_ERROR, payload: e.message });
      });
  }, []);

  return <Provider value={{ appStore: store, appDispatch: dispatch, onLogin }}>{children}</Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
