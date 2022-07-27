import axiosInstance from './api-requests'

export const createAddress = data => axiosInstance.post('/address', data)

export const editAddress = (id, data) => axiosInstance.patch(`/address/${id}`, data)

export const deleteAddress = id => axiosInstance.delete(`/address/${id}`)