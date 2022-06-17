import React from 'react';

import { SafeArea, Text } from '../../../components';
import { CartIconContainer, CartIcon } from '../components';

function CheckoutSuccessScreen() {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Text variant="label">Success!</Text>
      </CartIconContainer>
    </SafeArea>
  );
}

export default CheckoutSuccessScreen;
