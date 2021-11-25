import axiosInstance from './api-requests'

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

export const getCollections = () => {
  return axiosInstance.get('/collections')
}

export const getSingleCollection = id => {
  return axiosInstance.get(`/collections/${id}`)
}
