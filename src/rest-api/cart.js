import axiosInstance from './api-requests'

export const addToCart = productId => {
  return axiosInstance.patch(`/cart/add/${productId}`)
    .then(response => response)
    .catch(error => error)
}

export const removeFromCart = productId => {
  return axiosInstance.patch(`/cart/remove/${productId}`)
    .then(response => response)
    .catch(error => error)
}

export const clearFromCart = productId => {
  return axiosInstance.patch(`/cart/clear/${productId}`)
    .then(response => response)
    .catch(error => error)
}