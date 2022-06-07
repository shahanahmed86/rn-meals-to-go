import { Platform } from 'react-native';
import * as actions from './app.actions';

export const initialState = {
  isAndroid: Platform.OS === 'android',

  user: null,
  authenticating: false,
  authError: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.LOADING_AUTH: {
      return {
        ...state,
        user: null,
        authenticating: action.payload,
        authError: null,
      };
    }
    case actions.ON_AUTH: {
      return {
        ...state,
        user: action.payload,
        authenticating: false,
        authError: null,
      };
    }
    case actions.AUTH_ERROR: {
      return {
        ...state,
        user: null,
        authenticating: false,
        authError: action.payload,
      };
    }
    case actions.LOGOUT: {
      return {
        ...state,
        user: null,
        authenticating: false,
        authError: null,
      };
    }
    default: {
      return state;
    }
  }
}
