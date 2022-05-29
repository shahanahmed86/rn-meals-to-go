import camelize from 'camelize';

import { locations } from './location.mock';

export const locationRequest = searchTerm => {
  return new Promise((resolve, reject) => {
    if (typeof searchTerm !== 'string') reject('Invalid value found in search');
    if (!searchTerm) reject('Please type something...');

    if (!(searchTerm in locations)) reject('Location not found');

    resolve(locations[searchTerm]);
  });
};

export const locationTransform = result => {
  const formattedResponse = camelize(result);
  const { geometry } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng };
};
