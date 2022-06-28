import UserActionTypes from './user.types'
import { createAction } from '../reducer.utils'

export const setCurrentUser = user =>
  createAction(UserActionTypes.SET_CURRENT_USER, user)

export const setToken = token => 
  createAction(UserActionTypes.SET_TOKEN, token)

export const signUpFailure = error => 
  createAction(UserActionTypes.SIGN_UP_FAILURE, error)

export const signInFailure = error => 
  createAction(UserActionTypes.SIGN_IN_FAILURE, error)

export const signOutSuccess = () =>
  createAction(UserActionTypes.SIGN_OUT_SUCCESS)

export const signOutFailure = error => 
  createAction(UserActionTypes.SIGN_OUT_FAILURE, error)

export const resetErrorMessage = () => 
  createAction(UserActionTypes.RESET_ERROR_MESSAGE)

export const deleteAccountSuccess = () =>
  createAction(UserActionTypes.DELETE_ACCOUNT_SUCCESS)