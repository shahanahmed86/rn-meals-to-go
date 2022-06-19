import camelize from 'camelize';
import { httpRequest } from '@meals-to-go/utils';

export const restaurantsRequest = async location => {
  const url = `/placesNearby?location=${location}`;
  return httpRequest(url);
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map(restaurant => ({
    ...restaurant,
    address: restaurant.vicinity,
    isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
    isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
  }));

  return camelize(mappedResults);
};
