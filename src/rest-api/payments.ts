import axiosInstance from './api-requests'
import { makePaymentData, makePaymentIntentData } from 'shared/types/payments'

// export const makePayment = (data: makePaymentData) => axiosInstance.post('/payment', data)

export const makePaymentIntent = (data: makePaymentIntentData) => axiosInstance.post('/payment', data)