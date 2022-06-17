import React from 'react';
import PropTypes from 'prop-types';
import { LiteCreditCardInput } from 'react-native-credit-card-input';

function CreditCardInput({ onCardChange }) {
  return <LiteCreditCardInput onChange={onCardChange} />;
}

CreditCardInput.propTypes = {
  onCardChange: PropTypes.func.isRequired,
};

export default CreditCardInput;
