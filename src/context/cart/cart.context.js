import React, { useCallback, createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialCartState, cartReducer } from './cart.reducer';
import { cartActions } from './cart.actions';
import { withAppContext } from '@meals-to-go/context/app';
import { paymentRequest } from '@meals-to-go/services/checkout/checkout.service';

const { Provider, Consumer } = createContext();

export const withCartContext = Component => props => {
  return <Consumer>{value => <Component {...value} {...props} />}</Consumer>;
};

function CartProvider({ appStore, children }) {
  const [store, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = async (item, rst) => {
    const payload = JSON.stringify({ item, rst });
    await AsyncStorage.setItem(`@cart-${appStore.user.uid}`, payload);

    if (!store.restaurant || store.restaurant.placeId !== rst.placeId) {
      dispatch({ type: cartActions.SELECT_RESTAURANT, payload: rst });
      dispatch({ type: cartActions.ADD_TO_CART, payload: [item] });
      return;
    }
    dispatch({ type: cartActions.ADD_TO_CART, payload: [...store.cart, item] });
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem(`@cart-${appStore.user.uid}`);

    dispatch({ type: cartActions.SELECT_RESTAURANT, payload: null });
    dispatch({ type: cartActions.ADD_TO_CART, payload: [] });
  };

  const payNow = async payload => {
    try {
      dispatch({ type: cartActions.PAYING_STATE, payload: true });
      const result = await paymentRequest(payload);
      console.log(result);
      clearCart();
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: cartActions.PAYING_STATE, payload: false });
    }
  };

  const loadCart = useCallback(uid => {
    (async () => {
      try {
        const payload = await AsyncStorage.getItem(`@cart-${uid}`);
        if (payload) {
          const { item, rst } = JSON.parse(payload);

          dispatch({ type: cartActions.SELECT_RESTAURANT, payload: rst });
          dispatch({ type: cartActions.ADD_TO_CART, payload: [item] });
        }
      } catch (e) {
        console.log('error loading', e);
      }
    })();
  }, []);

  useEffect(() => {
    if (appStore.isAuthenticated) loadCart(appStore.user.uid);
  }, [loadCart, appStore.isAuthenticated, appStore.user]);

  return (
    <Provider
      value={{
        appStore,
        cartStore: store,
        cartDispatch: dispatch,
        addToCart,
        clearCart,
        payNow,
      }}>
      {children}
    </Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.element.isRequired,
  appStore: PropTypes.shape({
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withAppContext(CartProvider);
