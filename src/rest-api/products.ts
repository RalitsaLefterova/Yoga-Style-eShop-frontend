import axiosInstance from './api-requests'
import { multipartFormDataConfig } from './api-config'
// import { displayFormDataEntries } from 'shared/helpers'
import { CreateProductColor, RemoveImageFromColor } from 'shared/types/products'

export const createProduct = (data: FormData) => {
  return axiosInstance.post('/products', data, multipartFormDataConfig)
}

export const getProducts = () => {
  return axiosInstance.get('/products')
}

export const getCollectionProducts = (collectionTitle: string) => {
  return axiosInstance.get(`/products?collectionTitle=${collectionTitle}&active=true`)
}

export const getSingleProduct = (productId: string) => {
  return axiosInstance.get(`/products/${productId}`)
}

export const getSingleProductForEdit = (productId: string) => {
  return axiosInstance.get(`/products/${productId}?edit=true`)
}

export const editProduct = (productId: string, data: FormData) => {
  return axiosInstance.patch(`/products/${productId}`, data, multipartFormDataConfig)
}

export const deleteProduct = (productId: string) => {
  return axiosInstance.delete(`/products/${productId}`)
}

export const addColorToProduct = (productId: string, data: CreateProductColor) => {
  return axiosInstance.post(`/products/${productId}/colors`, data)
}

export const editProductColorData = (productId: string, colorId: string, data: FormData) => {
  return axiosInstance.patch(`/products/${productId}/colors/${colorId}`, data, multipartFormDataConfig)
}

export const removeImageFromColorImages = (productId: string, colorId: string, data: RemoveImageFromColor) => {
  return axiosInstance.patch(`/products/${productId}/colors/${colorId}/image`, data)
}

export const deleteColorFromProduct = (productId: string, colorId: string) => {
  return axiosInstance.delete(`/products/${productId}/colors/${colorId}`)
}