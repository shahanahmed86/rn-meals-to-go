import * as actions from './actions';

export const initialState = {
  restaurants: [],
  isLoading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.FETCH_RESTAURANTS: {
      return {
        ...state,
        restaurants: state.restaurants.concat(action.payload),
      };
    }
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
      };
    }
    case actions.UNSET_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}
