import * as actions from './app.actions';

export const initialState = {
  isLoading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case actions.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    case actions.UNSET_ERROR: {
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
