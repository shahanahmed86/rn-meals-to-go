import * as actions from './app.actions';

export const initialState = {
  user: null,
  authenticating: false,
  isAuthenticated: false,
  authError: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.LOADING_AUTH: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authenticating: action.payload,
        authError: null,
      };
    }
    case actions.ON_AUTH: {
      const user = action.payload;
      return {
        ...state,
        isAuthenticated: !!user,
        user,
        authenticating: false,
        authError: null,
      };
    }
    case actions.AUTH_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authenticating: false,
        authError: action.payload,
      };
    }
    case actions.RESET: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authenticating: false,
        authError: null,
      };
    }
    case actions.SAVE_PICTURE: {
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
