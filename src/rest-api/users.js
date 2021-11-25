import axiosInstance from './api-requests'

export const googleLogin = (data) => {
  return axiosInstance.post('/googlelogin', data)
    .then(response => {
      console.log('responseSuccessGoogle', response.data.user)
      return response
    })
    .catch(err => err)
}

export const login = (data) => {
  return axiosInstance.post('/users/login', data)
    .then(response => {
      return response
    })
    .catch(err => err)
}

export const logout = () => {
  return axiosInstance.post('/users/logout')
  // TODO redirect here?
}

export const getUsers = () => {
  return axiosInstance.get('/users')
}

export const getUserProfile = () => {
  return axiosInstance.get('/users/me').then(response => {
    console.log('getUserProfile', response)
    return response.data
  }).catch((error) => {
    console.log({error})
  })
}