import camelize from 'camelize';

import { locations } from './location.mock';

export const locationRequest = searchTerm => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof searchTerm !== 'string') reject(new Error('Invalid value found in search'));

      if (!(searchTerm in locations)) reject(new Error('Location not found'));

      resolve(locations[searchTerm]);
    }, 700);
  });
};

export const locationTransform = result => {
  const formattedResponse = camelize(result);
  const { geometry } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
