import camelize from 'camelize';
import { httpRequest } from '../../utils';

export const locationRequest = async searchTerm => {
  const url = `/geocode?city=${searchTerm}`;
  return httpRequest(url);
};

export const locationTransform = result => {
  const formattedResponse = camelize(result);
  const { geometry } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
