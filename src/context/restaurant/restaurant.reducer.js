import * as actions from './restaurant.actions';

export const initialState = {
  loadingRestaurants: false,
  restaurants: [],
  errorRestaurants: null,

  loadingLocation: false,
  location: null,
  errorLocation: null,

  searchText: 'chicago',

  favorites: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.SEARCH_RESTAURANTS: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case actions.LOADING_RESTAURANTS: {
      return {
        ...state,
        loadingRestaurants: action.payload,
        restaurants: [],
        errorRestaurants: null,
      };
    }
    case actions.FETCH_RESTAURANTS: {
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: action.payload,
        errorRestaurants: null,
      };
    }
    case actions.ERROR_RESTAURANTS: {
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: [],
        errorRestaurants: action.payload,
      };
    }
    case actions.LOADING_LOCATION: {
      return {
        ...state,
        loadingLocation: action.payload,
        location: null,
        errorLocation: null,
      };
    }
    case actions.FETCH_LOCATION: {
      return {
        ...state,
        loadingLocation: false,
        location: action.payload,
        errorLocation: null,
      };
    }
    case actions.ERROR_LOCATION: {
      return {
        ...state,
        loadingLocation: false,
        location: null,
        errorLocation: action.payload,
        restaurants: [],
      };
    }
    case actions.ADD_TO_FAVORITES: {
      return {
        ...state,
        favorites: state.favorites.concat([action.payload]),
      };
    }
    case actions.REMOVE_FROM_FAVORITES:
    case actions.LOAD_FAVORITES: {
      return {
        ...state,
        favorites: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
