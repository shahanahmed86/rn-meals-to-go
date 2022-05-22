import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { initialState, reducer } from './reducer';

const { Provider, Consumer } = createContext();

export const withAppContext = Component => props => <Consumer>{value => <Component {...value} {...props} />}</Consumer>;

function AppProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ ...store, dispatch }}>{children}</Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
