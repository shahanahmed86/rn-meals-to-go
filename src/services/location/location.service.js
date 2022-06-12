import camelize from 'camelize';
import { host as baseUrl } from '../../utils';

export const locationRequest = async searchTerm => {
  const url = `${baseUrl}/geocode?city=${searchTerm}`;
  return fetch(url)
    .then(_result => _result.json())
    .catch(console.error);
};

export const locationTransform = result => {
  const formattedResponse = camelize(result);
  const { geometry } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
