import * as actions from './app.actions';

export const initialState = {
  isAuthenticated: false,
  user: null,
  authenticating: false,
  authError: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.LOADING_AUTH: {
      return {
        ...state,
        authenticating: action.payload,
      };
    }
    case actions.ON_AUTH: {
      const user = action.payload;
      const isAuthenticated = !!user;
      return {
        ...state,
        isAuthenticated,
        user,
        authError: null,
      };
    }
    case actions.AUTH_ERROR: {
      return {
        ...state,
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
