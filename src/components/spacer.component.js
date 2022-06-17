import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const sizeVariants = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariants = {
  top: 'margin-top',
  right: 'margin-right',
  bottom: 'margin-bottom',
  left: 'margin-left',
};

const getVariant = (position, size, theme) => {
  const property = positionVariants[position];
  const sizeIndex = sizeVariants[size];
  const value = theme.space[sizeIndex];
  return `${property}: ${value}`;
};

const SpacerView = styled(View)`
  ${({ variant }) => variant};
`;

const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

Spacer.defaultProps = {
  position: 'top',
  size: 'small',
};

Spacer.propTypes = {
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  children: PropTypes.element,
};

export default Spacer;
