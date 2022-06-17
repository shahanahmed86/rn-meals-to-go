import { httpRequest } from '../../utils';

export const createTokenRequest = async cardInfo => {
  const url = '/payment/create-token';
  return httpRequest(url, 'POST', cardInfo);
};

export const paymentRequest = async paymentInfo => {
  const url = '/payment/pay';
  return httpRequest(url, 'POST', paymentInfo);
};
