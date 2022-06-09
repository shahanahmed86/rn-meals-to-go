import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './app.reducer';
import * as actions from './app.actions';
import {
  loginRequest,
  logoutRequest,
  onAuthStateChanged,
  registerRequest,
} from '../../services/authentication/authentication.service';

const { Provider, Consumer } = createContext();

export const withAppContext = Component => props => <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function AppProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  const onLogin = useCallback((email, password) => {
    dispatch({ type: actions.LOADING_AUTH, payload: true });

    loginRequest(email, password)
      .then(result => {
        let payload = result;
        if (result && 'user' in result) payload = result.user;

        dispatch({ type: actions.ON_AUTH, payload });
      })
      .catch(e => {
        dispatch({ type: actions.AUTH_ERROR, payload: e.message });
      });
  }, []);

  const onRegister = useCallback((email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return dispatch({ type: actions.AUTH_ERROR, payload: 'Passwords do not match' });
    }
    dispatch({ type: actions.LOADING_AUTH, payload: true });

    registerRequest(email, password)
      .then(result => {
        let payload = result;
        if (result && 'user' in result) payload = result.user;

        dispatch({ type: actions.ON_AUTH, payload });
      })
      .catch(e => {
        dispatch({ type: actions.AUTH_ERROR, payload: e.message });
      });
  }, []);

  useEffect(() => {
    onAuthStateChanged(dispatch);
  }, []);

  const onLogout = useCallback(() => {
    dispatch({ type: actions.LOADING_AUTH, payload: true });
    logoutRequest()
      .then(() => {
        dispatch({ type: actions.RESET });
      })
      .catch(e => {
        dispatch({ type: actions.AUTH_ERROR, payload: e.message });
      });
  }, []);

  return (
    <Provider value={{ appStore: store, appDispatch: dispatch, onLogin, onRegister, onLogout }}>{children}</Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
