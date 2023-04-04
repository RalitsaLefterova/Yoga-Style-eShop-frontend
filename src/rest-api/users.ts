import { GenericObject } from 'shared/types/common'
import { User } from 'shared/types/users'
import axiosInstance from './api-requests'

type googleLoginData = {
  tokenId: string
}
type signUpData = {
  email: string, 
  password: string, 
  fullName: string
}
type logInData = {
  email: string, 
  password: string
}
type forgotPasswordData = {
  email: string
}
export const googleLogin = (data: googleLoginData) => axiosInstance.post('/auth/googlelogin', data)

export const signup = (data: signUpData) => axiosInstance.post('/auth/sign-up', data)

export const login = (data: logInData) => axiosInstance.post('/auth/login', data)

export const logout = () => axiosInstance.post('/auth/logout')


export const getLoggedUserProfile = () => axiosInstance.get('/users/me')

export const editUserInfo = (data: User | GenericObject ) => axiosInstance.patch('/users/me', data)

export const deleteAccount = () => axiosInstance.delete('users/me')

export const forgotPassword = (data: forgotPasswordData) => axiosInstance.post('/auth/forgot-password', data)

export const resetPassword = (userId: string, resetToken: string, password: string) => {
  return axiosInstance.post(`auth/reset-password/${userId}/${resetToken}`, { password })
}

// export const getUsers = () => axiosInstance.get('/users')
export const getAllUsers = () => axiosInstance.get('/users')

export const adminGetUserById = (userId: string) => axiosInstance.get(`/users/${userId}`)

export const adminEditUserById = (userId: string, data: FormData) => axiosInstance.patch(`/users/${userId}`, data)

export const adminDeleteUserById = (userId: string) => axiosInstance.delete(`/users/${userId}`)