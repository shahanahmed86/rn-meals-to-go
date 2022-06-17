import { cartActions } from './cart.actions';

export const initialCartState = {
  cart: [],
  restaurant: null,
  payingState: false,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.ADD_TO_CART: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case cartActions.SELECT_RESTAURANT: {
      return {
        ...state,
        restaurant: action.payload,
      };
    }
    case cartActions.PAYING_STATE: {
      return {
        ...state,
        paying: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
