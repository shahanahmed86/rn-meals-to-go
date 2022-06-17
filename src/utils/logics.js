// import axios from 'axios';
import KeepAwake from 'react-native-keep-awake';
import { host as baseUrl } from './config';

export const changeKeepAwake = shouldBeAwake => {
  if (shouldBeAwake) KeepAwake.activate();
  else KeepAwake.deactivate();
};

export const httpRequest = async (url, method = 'GET', data) => {
  const requestUrl = baseUrl + url;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) options.body = JSON.stringify(data);

  return fetch(requestUrl, options).then(async response => {
    if (response.ok) return response.json();
    throw response.json();
  });
};
