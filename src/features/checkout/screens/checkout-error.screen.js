import React from 'react';
import PropTypes from 'prop-types';

import { SafeArea, Text } from '../../../components';
import { CartIconContainer, CartIcon } from '../components';
import { useTheme } from 'styled-components';

function CheckoutErrorScreen({ route }) {
  const theme = useTheme();
  const { error } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={theme.colors.ui.error} />
        <Text variant="error">{error}</Text>
      </CartIconContainer>
    </SafeArea>
  );
}

CheckoutErrorScreen.defaultProps = {
  route: {
    params: {
      error: '',
    },
  },
};

CheckoutErrorScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      error: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CheckoutErrorScreen;
