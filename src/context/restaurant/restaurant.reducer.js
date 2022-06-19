import { restaurantActions } from './restaurant.actions';

export const initialRestaurantState = {
  loadingRestaurants: false,
  restaurants: [],
  errorRestaurants: null,

  loadingLocation: false,
  location: null,
  errorLocation: null,

  searchText: '',

  favorites: [],
};

export function restaurantReducer(state, action) {
  switch (action.type) {
    case restaurantActions.SEARCH_RESTAURANTS: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case restaurantActions.LOADING_RESTAURANTS: {
      return {
        ...state,
        loadingRestaurants: action.payload,
        restaurants: [],
        errorRestaurants: null,
      };
    }
    case restaurantActions.FETCH_RESTAURANTS: {
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: action.payload,
        errorRestaurants: null,
      };
    }
    case restaurantActions.ERROR_RESTAURANTS: {
      return {
        ...state,
        loadingRestaurants: false,
        restaurants: [],
        errorRestaurants: action.payload,
      };
    }
    case restaurantActions.LOADING_LOCATION: {
      return {
        ...state,
        loadingLocation: action.payload,
        location: null,
        errorLocation: null,
      };
    }
    case restaurantActions.FETCH_LOCATION: {
      return {
        ...state,
        loadingLocation: false,
        location: action.payload,
        errorLocation: null,
      };
    }
    case restaurantActions.ERROR_LOCATION: {
      return {
        ...state,
        loadingLocation: false,
        location: null,
        errorLocation: action.payload,
        restaurants: [],
      };
    }
    case restaurantActions.ADD_TO_FAVORITES: {
      return {
        ...state,
        favorites: state.favorites.concat([action.payload]),
      };
    }
    case restaurantActions.REMOVE_FROM_FAVORITES:
    case restaurantActions.LOAD_FAVORITES: {
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
