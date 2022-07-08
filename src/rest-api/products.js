import axiosInstance from './api-requests'

export const createProduct = (data) => {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  return axiosInstance.post('/products', data, config)
    .then(response => {
      return response
    })
    .catch(err => err)
}

export const getProducts = () => {
  return axiosInstance.get('/products')
}

export const getCollectionProducts = collectionTitle => {
  return axiosInstance.get(`/products?collectionTitle=${collectionTitle}&active=true`)
}

export const getSingleProduct = productId => {
  return axiosInstance.get(`/products/${productId}`)
}

export const getSingleProductForEdit = productId => {
  return axiosInstance.get(`/products/${productId}?edit=true`)
}

export const editProduct = (productId, data) => {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  return axiosInstance.patch(`/products/${productId}`, data, config)
    .then(response => {
      return response
    })
    .catch(err => err)
}