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

export const addAdditionalImageToProduct = (productId, data) => {
  console.log('in the request', {productId}, {data})
  const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  }
  return axiosInstance.post(`/products/${productId}/images`, data, config)
    .then(response => {
      return response
    })
    .catch(err => err)
}

export const addColorToProduct = (productId, data) => {
  console.log(' in request addColorToProduct: ', productId, data)
  return axiosInstance.post(`/products/${productId}/colors`, data)
    .then(response => {
      return response
    })
    .catch(err => err) 
}


export const editProductColorData = (productId, colorId, data) => {
  // console.log('in the request editProductColorData', {productId}, {colorId}, {data})
  const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  }
  return axiosInstance.patch(`/products/${productId}/colors/${colorId}`, data, config)
    .then(response => {
      return response
    })
    .catch(err => err)
}

export const removeImageFromColorImages = (productId, colorId, data) => {
  console.log('in removeImageFromColorImages', {productId}, {colorId}, {data})
  return axiosInstance.patch(`/products/${productId}/colors/${colorId}/image`, data)
    .then(response => {
      return response
    })
    .catch(err => err)
}