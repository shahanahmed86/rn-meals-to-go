import { host as baseUrl } from './config';
import KeepAwake from 'react-native-keep-awake';

export const changeKeepAwake = shouldBeAwake => {
  if (shouldBeAwake) KeepAwake.activate();
  else KeepAwake.deactivate();
};

export const httpRequest = async url => {
  const _url = baseUrl + url;
  return fetch(_url).then(_result => _result.json());
};
