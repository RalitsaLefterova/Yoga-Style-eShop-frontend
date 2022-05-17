import axiosInstance from './api-requests'

export const getCollections = () => {
  return axiosInstance.get('/collections')
}

export const getCollectionsShortInfo = () => {
  return axiosInstance.get('/collections?short=true')
}

export const getSingleCollection = collectionId => {
  return axiosInstance.get(`/collections/${collectionId}`)
}

export const createCollection = (data) => {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  return axiosInstance.post('/collections', data, config)
    .then(response => {
      return response
    })
    .catch(err => err)
}

export const editCollection = (collectionId, data) => {
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  return axiosInstance.patch(`/collections/${collectionId}`, data, config)
    .then(response => {
      return response
    })
    .catch(err => err)
}

export const deleteCollection = (collectionId) => {
  return axiosInstance.delete(`/collections/${collectionId}`)
}
