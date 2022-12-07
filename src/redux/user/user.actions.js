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

export const googleSignInRequested = tokenId => 
  createAction(UserActionTypes.GOOGLE_SIGN_IN_REQUESTED, tokenId)

export const signInFailed = error => 
  createAction(UserActionTypes.SIGN_IN_FAILED, error)


export const signOutRequested = ({ navigate }) =>
  createAction(UserActionTypes.SIGN_OUT_REQUESTED, { navigate })

export const signOutSuccess = () =>
  createAction(UserActionTypes.SIGN_OUT_SUCCESS)

export const signOutFailed = error => 
  createAction(UserActionTypes.SIGN_OUT_FAILED, error)

export const sessionExpired = ({ navigate }) => 
  createAction(UserActionTypes.SESSION_EXPIRED, { navigate })

export const forgotPasswordRequested = ({ email }) =>
  createAction(UserActionTypes.FORGOT_PASSWORD_REQUESTED, { email })

export const forgotPasswordSuccess = () =>
  createAction(UserActionTypes.FORGOT_PASSWORD_SUCCESS)

export const forgotPasswordFailed = error => 
  createAction(UserActionTypes.FORGOT_PASSWORD_FAILED, error)


export const resetPasswordRequested = ({ userId, resetToken, password }) =>
  createAction(UserActionTypes.RESET_PASSWORD_REQUESTED, { userId, resetToken, password })

export const resetPasswordSuccess = () =>
  createAction(UserActionTypes.RESET_PASSWORD_SUCCESS)

export const resetPasswordFailed = error => 
  createAction(UserActionTypes.RESET_PASSWORD_FAILED, error)


export const getUserProfileRequested = () => 
  createAction(UserActionTypes.GET_USER_PROFILE_REQUESTED)

export const getUserProfileFailed = error => 
  createAction(UserActionTypes.GET_USER_PROFILE_FAILED, error)

export const toggleIsUpsert = () => 
  createAction(UserActionTypes.TOGGLE_IS_UPSERT)

export const editUserRequested = data => 
  createAction(UserActionTypes.EDIT_USER_REQUESTED, { data })

export const editUserFailed = error => 
  createAction(UserActionTypes.EDIT_USER_FAILED, error)

export const createAddressRequested = data => 
  createAction(UserActionTypes.CREATE_ADDRESS_REQUESTED, { data })

export const editAddressRequested = (id, data) => 
  createAction(UserActionTypes.EDIT_ADDRESS_REQUESTED, { id, data })

export const deleteAddressRequested = id => 
  createAction(UserActionTypes.DELETE_ADDRESS_REQUESTED, { id })


export const deleteAccountRequested = ({ navigate }) =>
  createAction(UserActionTypes.DELETE_ACCOUNT_REQUESTED, { navigate })

export const deleteAccountSuccess = () =>
  createAction(UserActionTypes.DELETE_ACCOUNT_SUCCESS)

export const deleteAccountFailed = error =>
  createAction(UserActionTypes.DELETE_ACCOUNT_FAILED, { error })

export const resetErrorMessagesRequested = () => 
  createAction(UserActionTypes.RESET_ERROR_MESSAGES)