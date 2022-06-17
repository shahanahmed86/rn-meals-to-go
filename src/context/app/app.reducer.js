import { appActions } from './app.actions';

export const initialAppState = {
  isAuthenticated: false,
  user: null,
  authenticating: false,
  authError: null,
};

export function appReducer(state, action) {
  switch (action.type) {
    case appActions.LOADING_AUTH: {
      return {
        ...state,
        authenticating: action.payload,
      };
    }
    case appActions.ON_AUTH: {
      const user = action.payload;
      const isAuthenticated = !!user;
      return {
        ...state,
        isAuthenticated,
        user,
        authError: null,
      };
    }
    case appActions.AUTH_ERROR: {
      return {
        ...state,
        authError: action.payload,
      };
    }
    case appActions.RESET: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authenticating: false,
        authError: null,
      };
    }
    case appActions.SAVE_PICTURE: {
      return {
        ...state,
        user: Object.assign({}, state.user, { photoURL: action.payload }),
      };
    }
    default: {
      return state;
    }
  }
}
