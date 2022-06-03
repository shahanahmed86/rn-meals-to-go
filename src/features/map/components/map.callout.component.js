import React from 'react';
import PropTypes from 'prop-types';
import { CompactRestaurantInfo } from '../../../components';

function MapCallout({ restaurant, isAndroid }) {
  return <CompactRestaurantInfo restaurant={restaurant} isAndroid={isAndroid} />;
}

MapCallout.propTypes = {
  restaurant: PropTypes.object.isRequired,
  isAndroid: PropTypes.bool.isRequired,
};

export default MapCallout;
