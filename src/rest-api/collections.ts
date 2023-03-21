import axiosInstance from './api-requests'
import { multipartFormDataConfig } from './api-config'
import { ICreateCollectionData, IEditCollectionData } from 'shared/interfaces/collections'

export const getCollections = () => {
  return axiosInstance.get('/collections')
}

export const getCollectionsShortInfo = () => {
  return axiosInstance.get('/collections?short=true')
}

export const getSingleCollection = (collectionId: string) => {
  return axiosInstance.get(`/collections/${collectionId}`)
}

export const createCollection = (data: FormData) => {
  console.log('createCollection request data:', data)
  return axiosInstance.post('/collections', data, multipartFormDataConfig)
}

export const editCollection = (collectionId: string, data: FormData) => {
  console.log('editCollection request data:', data)
  return axiosInstance.patch(`/collections/${collectionId}`, data, multipartFormDataConfig)
}

export const editCollectionPosition = ( collectionId: string, position: number ) => {
  console.log('edit colection position', collectionId, position)
  return axiosInstance.patch(`/collections/reorder/${collectionId}`, { newPosition: position })
}

export const deleteCollection = (collectionId: string) => {
  return axiosInstance.delete(`/collections/${collectionId}`)
}