import axiosInstance from './api-requests'

export const getOrders = () => axiosInstance.get('/orders')

export const getOrderDetails = (orderId: string) => axiosInstance.get(`/orders/${orderId}`)

export const createOrder = (data: FormData) => axiosInstance.post('/orders', data)

export const editOrder = (orderId: string, data: FormData) => axiosInstance.patch(`/orders/${orderId}`, data)