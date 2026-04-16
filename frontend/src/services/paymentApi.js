// frontend/src/services/paymentApi.js
import { api } from './api';

export const createPaymentOrder = async (amount) => {
  const response = await api.post('/payment/create-order', { amount });
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await api.post('/payment/verify', data);
  return response.data;
};