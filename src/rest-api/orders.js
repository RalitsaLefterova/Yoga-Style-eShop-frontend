import axiosInstance from './api-requests'

export const getOrders = () => {
  return axiosInstance.get('/orders')
}

export const createOrder = data => {
  return axiosInstance.post('/orders', data)
}