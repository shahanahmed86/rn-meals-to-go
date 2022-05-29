import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './app.reducer';

const { Provider, Consumer } = createContext();

export const withAppContext = Component => props => <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function AppProvider({ children }) {
  const [appStore, appDispatch] = useReducer(reducer, initialState);

  return <Provider value={{ appStore, appDispatch }}>{children}</Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
