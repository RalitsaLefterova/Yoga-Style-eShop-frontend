import axiosInstance from './api-requests'
import { makePaymentData } from 'shared/types/payments'

export const makePayment = (data: makePaymentData) => axiosInstance.post('/payment', data)