import camelize from 'camelize';
import { mockImages, mocks } from './mock';

export const restaurantsRequest = location => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mock = mocks[location];
      if (!mock) reject(new Error('Location not found'));
      resolve(mock);
    }, 700);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map(restaurant => ({
    ...restaurant,
    address: restaurant.vicinity,
    photos: restaurant.photos.map(() => mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]),
    isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
    isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
  }));

  return camelize(mappedResults);
};
