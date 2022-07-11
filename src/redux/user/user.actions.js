import UserActionTypes from './user.types'
import { createAction } from '../reducer.utils'

export const setCurrentUser = user =>
  createAction(UserActionTypes.SET_CURRENT_USER, user)

export const setToken = token => 
  createAction(UserActionTypes.SET_TOKEN, token)


export const signUpRequested = ({ email, password, fullName }) => 
  createAction(UserActionTypes.SIGN_UP_REQUESTED, { email, password, fullName })

export const signUpFailed = error => 
  createAction(UserActionTypes.SIGN_UP_FAILED, error)


export const emailSignInRequested = ({ email, password }) => 
  createAction(UserActionTypes.EMAIL_SIGN_IN_REQUESTED, { email, password })

export const googleSignInRequested = (tokenId) => 
  createAction(UserActionTypes.GOOGLE_SIGN_IN_REQUESTED, tokenId)

export const signInFailed = error => 
  createAction(UserActionTypes.SIGN_IN_FAILED, error)


export const signOutRequested = ({ history }) =>
  createAction(UserActionTypes.SIGN_OUT_REQUESTED, { history })

export const signOutSuccess = () =>
  createAction(UserActionTypes.SIGN_OUT_SUCCESS)

export const signOutFailed = error => 
  createAction(UserActionTypes.SIGN_OUT_FAILED, error)















export const resetErrorMessage = () => 
  createAction(UserActionTypes.RESET_ERROR_MESSAGE)

export const deleteAccountSuccess = () =>
  createAction(UserActionTypes.DELETE_ACCOUNT_SUCCESS)


