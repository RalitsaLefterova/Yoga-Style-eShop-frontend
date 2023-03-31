import axiosInstance from './api-requests'
import { Address } from 'shared/types/addresses'

export const createAddress = (address: Address) => axiosInstance.post('/address', address)

export const editAddress = (addressId: string, address: Address) => axiosInstance.patch(`/address/${addressId}`, address)

export const deleteAddress = (addressId: string) => axiosInstance.delete(`/address/${addressId}`)