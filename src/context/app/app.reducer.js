import { Platform } from 'react-native';
import * as actions from './app.actions';

export const initialState = {
  isAndroid: Platform.OS === 'android',

  user: null,
  authenticating: false,
  errorAuth: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.LOADING_AUTH: {
      return {
        ...state,
        user: null,
        authenticating: action.payload,
        errorAuth: null,
      };
    }
    case actions.ON_AUTH: {
      return {
        ...state,
        user: action.payload,
        authenticating: false,
        errorAuth: null,
      };
    }
    case actions.AUTH_ERROR: {
      return {
        ...state,
        user: null,
        authenticating: false,
        errorAuth: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
