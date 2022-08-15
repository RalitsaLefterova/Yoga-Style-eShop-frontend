import axiosInstance from './api-requests'

export const getOrders = () => {
  return axiosInstance.get('/orders')
}

export const getOrderDetails = orderId => {
  return axiosInstance.get(`/orders/${orderId}`)
}

export const createOrder = data => {
  return axiosInstance.post('/orders', data)
} 

export const editOrder = (orderId, data) => {
  return axiosInstance.patch(`/orders/${orderId}`, data)
}