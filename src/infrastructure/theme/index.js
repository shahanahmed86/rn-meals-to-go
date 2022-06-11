import { Platform } from 'react-native';

import { colors } from './colors';
import { space, lineHeights } from './spacing.js';
import { sizes } from './sizes.js';
import { fonts, fontWeights, fontSizes } from './fonts';

const isAndroid = Platform.OS === 'android';

export const theme = {
  colors,
  space,
  lineHeights,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
  isAndroid,
};
