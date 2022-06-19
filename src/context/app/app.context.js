import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { initialAppState, appReducer } from './app.reducer';
import { appActions } from './app.actions';
import {
  loginRequest,
  logoutRequest,
  onAuthStateChanged,
  reformUserPayload,
  registerRequest,
} from '@meals-to-go/services/authentication/authentication.service';

const { Provider, Consumer } = createContext();

export const withAppContext = Component => props => {
  return <Consumer>{value => <Component {...value} {...props} />}</Consumer>;
};

function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, initialAppState);

  const onLogin = useCallback(
    (email, password) => {
      dispatch({ type: appActions.LOADING_AUTH, payload: true });

      loginRequest(email, password).then(result => reformUserPayload(result, dispatch));
    },
    [dispatch],
  );

  const onRegister = useCallback(
    (email, password, confirmPassword) => {
      if (password !== confirmPassword) {
        return dispatch({ type: appActions.AUTH_ERROR, payload: 'Passwords do not match' });
      }
      dispatch({ type: appActions.LOADING_AUTH, payload: true });

      registerRequest(email, password).then(result => reformUserPayload(result, dispatch));
    },
    [dispatch],
  );

  useEffect(() => {
    onAuthStateChanged(dispatch);
  }, []);

  const onLogout = () => {
    dispatch({ type: appActions.LOADING_AUTH, payload: true });
    logoutRequest()
      .then(() => dispatch({ type: appActions.RESET }))
      .catch(e => dispatch({ type: appActions.AUTH_ERROR, payload: e.message }))
      .finally(() => dispatch({ type: appActions.LOADING_AUTH, payload: false }));
  };

  return (
    <Provider value={{ appStore: store, appDispatch: dispatch, onLogin, onRegister, onLogout }}>{children}</Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
