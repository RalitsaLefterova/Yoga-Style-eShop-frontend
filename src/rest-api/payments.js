import axiosInstance from './api-requests'

export const makePayment = data => axiosInstance.post('/payment', data)