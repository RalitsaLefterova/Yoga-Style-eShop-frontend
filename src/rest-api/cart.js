import axiosInstance from './api-requests'

export const addToCart = productId => {
  return axiosInstance.patch(`/cart/add/${productId}`)
}

export const removeFromCart = productId => {
  return axiosInstance.patch(`/cart/remove/${productId}`)
}

export const clearFromCart = productId => {
  return axiosInstance.patch(`/cart/clear/${productId}`)
}

export const emptyCart = () => {
  return axiosInstance.patch('/cart/empty')
}