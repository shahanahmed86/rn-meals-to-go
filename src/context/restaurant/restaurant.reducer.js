import * as actions from './restaurant.actions';

export const initialState = {
  restaurants: [],
  isLoading: false,
  error: null,
  searchText: '',
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.SEARCH_RESTAURANTS: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case actions.FETCH_RESTAURANTS: {
      return {
        ...state,
        restaurants: state.restaurants.concat(action.payload),
        isLoading: false,
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
        isLoading: false,
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
