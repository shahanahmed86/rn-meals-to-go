import React from 'react';
import PropTypes from 'prop-types';
import { CompactRestaurantInfo } from '@meals-to-go/components';

function MapCallout({ restaurant }) {
  return <CompactRestaurantInfo restaurant={restaurant} onMapScreen />;
}

MapCallout.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

export default MapCallout;
