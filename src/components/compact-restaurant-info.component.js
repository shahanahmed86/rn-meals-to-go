import React from 'react';
import { Platform, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';

import Text from './text.component';

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled(View)`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

function CompactRestaurantInfo({ restaurant, isAndroid, onMapScreen }) {
  const ResponsiveImage = isAndroid && onMapScreen ? CompactWebView : CompactImage;
  return (
    <Item>
      <ResponsiveImage source={{ uri: restaurant.photos[0] }} />
      <Text center variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
}

CompactRestaurantInfo.defaultProps = {
  onMapScreen: false,
};

CompactRestaurantInfo.propTypes = {
  restaurant: PropTypes.object.isRequired,
  isAndroid: PropTypes.bool.isRequired,
  onMapScreen: PropTypes.bool.isRequired,
};

export default CompactRestaurantInfo;