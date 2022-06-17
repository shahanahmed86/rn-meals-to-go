import { favoriteActions } from './favorite.actions';

export const initialFavoriteState = {
  favorites: [],
};

export function favoriteReducer(state, action) {
  switch (action.type) {
    case favoriteActions.ADD_TO_FAVORITES: {
      return {
        ...state,
        favorites: state.favorites.concat([action.payload]),
      };
    }
    case favoriteActions.REMOVE_FROM_FAVORITES:
    case favoriteActions.LOAD_FAVORITES: {
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
