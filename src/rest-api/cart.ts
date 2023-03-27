import axiosInstance from './api-requests'

export const addToCart = (productId: string) => {
  return axiosInstance.patch(`/cart/add/${productId}`)
}

export const removeFromCart = (productId: string) => {
  return axiosInstance.patch(`/cart/remove/${productId}`)
}

export const clearFromCart = (productId: string) => {
  return axiosInstance.patch(`/cart/clear/${productId}`)
}

export const emptyCart = () => {
  return axiosInstance.patch('/cart/empty')
}