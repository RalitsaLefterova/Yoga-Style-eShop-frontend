import axios from 'axios'

import apiConfig from './api-config'
import { toggleModal } from '../components/custom-alert/custom-alert.component'

const axiosInstance = axios.create({
  baseURL: apiConfig.databaseURL
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
    console.log('error -> ', error)
    console.log('error response status -> ', error.response.status)
    if (error.response.status === 401) {
      
      toggleModal(true, {
        title: 'Session expired',
        text: 'Your session has expired. You will be redirected to the login page.',
        textCenter: true,
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
        hasSessionExpired: true
      })
    } 
    else {
      return Promise.reject(error)
    }
  }   
)

export default axiosInstance