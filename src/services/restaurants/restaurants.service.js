import camelize from 'camelize';
import { host as baseUrl } from '../../utils';

export const restaurantsRequest = location => {
  const url = `${baseUrl}/placesNearby?location=${location}`;
  return fetch(url)
    .then(_result => _result.json())
    .catch(console.error);
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
