import axiosInstance from './api-requests'

export const googleLogin = data => {
  return axiosInstance.post('/auth/googlelogin', data)
    .then(response => {
      console.log('responseSuccessGoogle', response.data.user)
      return response
    })
    .catch(err => err)
}

export const signup = data => {
  return axiosInstance.post('/auth/sign-up', data)
    .then(response => response)
    .catch(error => error)
}

export const login = data => {
  return axiosInstance.post('/auth/login', data)
    .then(response => response)
    .catch(error => error)
}

export const logout = () => {
  return axiosInstance.post('/auth/logout')
}

export const getUsers = () => {
  return axiosInstance.get('/users')
}

export const getUserProfile = () => {
  return axiosInstance.get('/users/me')
    .then(response => response)
}

export const editUserInfo = data => {
  return axiosInstance.patch('/users/me', data)
    .then(response => response)
}

export const deleteAccount = () => {
  return axiosInstance.delete('users/me')
    .then(response => response)
}