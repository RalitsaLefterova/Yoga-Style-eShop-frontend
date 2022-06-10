import axios from 'axios'
import apiConfig from './api-config'

const axiosInstance = axios.create({
  baseURL: apiConfig.databaseURL,
  // baseURL: process.env.API_URL,
})

axiosInstance.interceptors.request.use(req => {
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
  req.headers.Authorization = user && user.token ? `Bearer ${user.token}` : ''
  return req
})

axiosInstance.interceptors.response.use(
  res => {
    return res
  },
  error => {
    throw error
  }   
)

export default axiosInstance