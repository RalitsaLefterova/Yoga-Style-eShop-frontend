import axios from 'axios'

import apiConfig from './api-config'
import { toggleModal } from '../components/custom-alert/custom-alert.component'

const axiosInstance = axios.create({
  baseURL: apiConfig.databaseURL,
  // baseURL: process.env.API_URL,
  // baseURL: 'https://yoga-style-shop.com/api/',
})

axiosInstance.interceptors.request.use(
  req => {
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
  req.headers.Authorization = user && user.token ? `Bearer ${user.token}` : ''
  return req
  },
  (error) => promise.reject(error)
)

axiosInstance.interceptors.response.use(
  res => {
    return res
  },
  error => {
    if (error.response.status === 401) {
      toggleModal(true, {
        title: 'Session expired',
        text: '<div className="center">Your session has expired. You will be redirected to the login page.<div>',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
        onConfirmRedirectTo: '/sign-in'
      })
    } 
    else {
      return Promise.reject(error)
    }
  }   
)

export default axiosInstance