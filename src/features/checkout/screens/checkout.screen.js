import React, { Fragment, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

import { withCartContext } from '@meals-to-go/context';
import {
  CreditCardInput,
  CartIconContainer,
  CartIcon,
  NameInput,
  PayButton,
  ClearButton,
  ActionsWrapper,
} from '../components';
import { SafeArea, Spacer, Text } from '@meals-to-go/components';
import { createTokenRequest } from '@meals-to-go/services/checkout/checkout.service';
import { RestaurantInfoCard } from '@meals-to-go/features/restaurants/components';

function CheckoutScreen({ cartStore, clearCart, payNow, navigation }) {
  const { cart, restaurant, paying } = cartStore;
  const [name, setName] = useState('');
  const [paymentToken, setPaymentToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onCardChange = async ({ valid, values, status }) => {
    try {
      setIsLoading(true);

      if (valid !== isComplete) setIsComplete(valid);

      const isValid = Object.values(status).every(state => state === 'valid');
      if (!valid || !isValid) return;

      const [expMonth, expYear] = values.expiry.split('/');

      const cardInfo = {
        name,
        number: values.number.replace(/\s/g, ''),
        exp_month: +expMonth,
        exp_year: +expYear,
        cvc: values.cvc,
      };

      const token = await createTokenRequest(cardInfo);
      setPaymentToken(token);
    } catch (error) {
      console.log('stripe token error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = useMemo(
    () => !name || !isComplete || isLoading || !paymentToken,
    [name, isComplete, isLoading, paymentToken],
  );

  const sumOfCart = useMemo(() => {
    if (cart.length) return cart.reduce((acc, cur) => (acc += cur.price), 0);
    return 0;
  }, [cart]);

  const handlePayment = async () => {
    try {
      const payload = { token: paymentToken, amount: sumOfCart };
      await payNow(payload);
      setName('');
      navigation.navigate('CheckoutSuccess');
    } catch (error) {
      console.log('stripe token error', error);
      navigation.navigate('CheckoutError', { error: 'Something went wrong with your payment' });
    }
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Spacer>
            <Text>Your cart is empty</Text>
          </Spacer>
        </CartIconContainer>
      </SafeArea>
    );
  }
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <Spacer position="left" size="medium">
          <Fragment>
            <Text>Your Order</Text>
            <List.Section>
              {cart.map(({ item, price }, i) => (
                <List.Item key={`cart-item-${i}`} title={`${item} - ${price / 100}`} />
              ))}
            </List.Section>
            <Text>Total : {sumOfCart / 100}</Text>
          </Fragment>
        </Spacer>
        <Spacer size="large" />
        <Divider />
        <Spacer />

        <NameInput label="Name" value={name} onChangeText={setName} />
        {name.length > 0 && (
          <Spacer position="top" size="large">
            <CreditCardInput onCardChange={onCardChange} />
          </Spacer>
        )}
        <Spacer size="large" />
        <ActionsWrapper>
          <PayButton disabled={disabled || paying} onPress={handlePayment}>
            Pay
          </PayButton>
          <Spacer position="left" size="large">
            <ClearButton disabled={paying} onPress={clearCart}>
              Clear Cart
            </ClearButton>
          </Spacer>
        </ActionsWrapper>
      </ScrollView>
    </SafeArea>
  );
}

CheckoutScreen.propTypes = {
  cartStore: PropTypes.shape({
    cart: PropTypes.array.isRequired,
    restaurant: PropTypes.object,
  }).isRequired,
  clearCart: PropTypes.func.isRequired,
  payNow: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withCartContext(CheckoutScreen);
