import axiosInstance from './api-requests'
import { multipartFormDataConfig } from './api-config'

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

// export const addAdditionalImageToProduct = (productId: string, data: FormData) => {
//   return axiosInstance.post(`/products/${productId}/images`, data, multipartFormDataConfig)
// }

export const addColorToProduct = (productId: string, data: FormData) => {
  // console.log(' in request addColorToProduct: ', productId, data)
  return axiosInstance.post(`/products/${productId}/colors`, data)
}

export const editProductColorData = (productId: string, colorId: string, data: FormData) => {
  // console.log('in the request editProductColorData', {productId}, {colorId}, {data})
  return axiosInstance.patch(`/products/${productId}/colors/${colorId}`, data, multipartFormDataConfig)
}

export const removeImageFromColorImages = (productId: string, colorId: string, data: FormData) => {
  // console.log('in removeImageFromColorImages', {productId}, {colorId}, {data})
  return axiosInstance.patch(`/products/${productId}/colors/${colorId}/image`, data)
}