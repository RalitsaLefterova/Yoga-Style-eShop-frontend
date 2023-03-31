import UserActionTypes from './user.types'
import { createAction, Action, ActionWithPayload, withMatcher } from '../reducer.utils'
import { User } from '../../shared/types/users'
import { NavigateFunction } from 'react-router-dom'
import { Address } from 'shared/types/addresses'


// SIGN UP //
export type SignUpRequested = ActionWithPayload<UserActionTypes.SIGN_UP_REQUESTED, { email: string, password: string, fullName: string }>
export const signUpRequested = withMatcher(( email: string, password: string, fullName: string ): SignUpRequested => 
  createAction(UserActionTypes.SIGN_UP_REQUESTED, { email, password, fullName }))

export type SignUpFailed = ActionWithPayload<UserActionTypes.SIGN_UP_FAILED, Error>
export const signUpFailed = withMatcher((error: Error): SignUpFailed => 
  createAction(UserActionTypes.SIGN_UP_FAILED, error))


// SIGN IN //
export type EmailSignInRequested = ActionWithPayload<UserActionTypes.EMAIL_SIGN_IN_REQUESTED, { email: string, password: string }>
export const emailSignInRequested = withMatcher((email: string, password: string): EmailSignInRequested => 
  createAction(UserActionTypes.EMAIL_SIGN_IN_REQUESTED, { email, password }))

export type GoogleSignInRequested = ActionWithPayload<UserActionTypes.GOOGLE_SIGN_IN_REQUESTED, { tokenId: string }>
export const googleSignInRequested = withMatcher((tokenId: string): GoogleSignInRequested => 
  createAction(UserActionTypes.GOOGLE_SIGN_IN_REQUESTED, { tokenId }))

export type SignInFailed = ActionWithPayload<UserActionTypes.SIGN_IN_FAILED, Error>
export const signInFailed = withMatcher((error: Error): SignInFailed => 
  createAction(UserActionTypes.SIGN_IN_FAILED, error))


// SET USER DETAILS ( cases: signIn, signUp, getLoggedUser, editLoggedUser, createAddress, editAddress, deleteAddress, ... ) //
export type SetCurrentUser = ActionWithPayload<UserActionTypes.SET_CURRENT_USER, User>
export const setCurrentUser = withMatcher((user: User): SetCurrentUser =>
  createAction(UserActionTypes.SET_CURRENT_USER, user))

export type SetToken = ActionWithPayload<UserActionTypes.SET_TOKEN, string>
export const setToken = withMatcher((token: string): SetToken =>   
  createAction(UserActionTypes.SET_TOKEN, token))

  
// SIGN OUT //
export type SignOutRequested = ActionWithPayload<UserActionTypes.SIGN_OUT_REQUESTED, { navigate: NavigateFunction }>
export const signOutRequested = withMatcher((navigate: NavigateFunction): SignOutRequested =>
  createAction(UserActionTypes.SIGN_OUT_REQUESTED, { navigate }))

export type SignOutSuccess = Action<UserActionTypes.SIGN_OUT_SUCCESS>
export const signOutSuccess = withMatcher((): SignOutSuccess =>
  createAction(UserActionTypes.SIGN_OUT_SUCCESS))

export type SignOutFailed = ActionWithPayload<UserActionTypes.SIGN_OUT_FAILED, Error>
export const signOutFailed = withMatcher((error: Error): SignOutFailed => 
  createAction(UserActionTypes.SIGN_OUT_FAILED, error))


// SESSION EXPIRED //
export type SessionExpired = Action<UserActionTypes.SESSION_EXPIRED>
export const sessionExpired = withMatcher((): SessionExpired =>
  createAction(UserActionTypes.SESSION_EXPIRED))
export type NavigateAfterSessionExpired = ActionWithPayload<UserActionTypes.NAVIGATE_AFTER_SESSION_EXPIRED, { navigate: NavigateFunction }>
export const navigateAfterSessionExpired = withMatcher((navigate: NavigateFunction): NavigateAfterSessionExpired =>
  createAction(UserActionTypes.NAVIGATE_AFTER_SESSION_EXPIRED, { navigate }))


// FORGOT PASSWORD //
export type ForgotPasswordRequested = ActionWithPayload<UserActionTypes.FORGOT_PASSWORD_REQUESTED, { email: string }>
export const forgotPasswordRequested = withMatcher((email: string): ForgotPasswordRequested => 
  createAction(UserActionTypes.FORGOT_PASSWORD_REQUESTED, { email }))

export type ForgotPasswordSuccess = Action<UserActionTypes.FORGOT_PASSWORD_SUCCESS>
export const forgotPasswordSuccess = withMatcher((): ForgotPasswordSuccess =>
  createAction(UserActionTypes.FORGOT_PASSWORD_SUCCESS))

export type ForgotPasswordFailed = ActionWithPayload<UserActionTypes.FORGOT_PASSWORD_FAILED, Error>
export const forgotPasswordFailed = withMatcher((error: Error): ForgotPasswordFailed => 
  createAction(UserActionTypes.FORGOT_PASSWORD_FAILED, error))


// RESET PASSWORD //
export type ResetPasswordRequested = ActionWithPayload<UserActionTypes.RESET_PASSWORD_REQUESTED, { userId: string, resetToken: string, password: string }>
export const resetPasswordRequested = withMatcher((userId: string, resetToken: string, password: string): ResetPasswordRequested => 
  createAction(UserActionTypes.RESET_PASSWORD_REQUESTED, { userId, resetToken, password }))

export type ResetPasswordSuccess = Action<UserActionTypes.RESET_PASSWORD_SUCCESS>
export const resetPasswordSuccess = withMatcher((): ResetPasswordSuccess =>
  createAction(UserActionTypes.RESET_PASSWORD_SUCCESS))

export type ResetPasswordFailed = ActionWithPayload<UserActionTypes.RESET_PASSWORD_FAILED, Error>
export const resetPasswordFailed = withMatcher((error: Error): ResetPasswordFailed => 
  createAction(UserActionTypes.RESET_PASSWORD_FAILED, error))


// TOGGLE IS UPSERT //  
export type ToggleIsUpsert = Action<UserActionTypes.TOGGLE_IS_UPSERT>
export const toggleIsUpsert = withMatcher((): ToggleIsUpsert => 
  createAction(UserActionTypes.TOGGLE_IS_UPSERT))
    
    
// GET LOGGED USER PROFILE //
export type GetLoggedUserProfileRequested = Action<UserActionTypes.GET_LOGGED_USER_PROFILE_REQUESTED>
export const getLoggedUserProfileRequested = withMatcher((): GetLoggedUserProfileRequested => 
createAction(UserActionTypes.GET_LOGGED_USER_PROFILE_REQUESTED))

export type GetUserProfileFailed = ActionWithPayload<UserActionTypes.GET_LOGGED_USER_PROFILE_FAILED, Error>  
export const getUserProfileFailed = withMatcher((error: Error): GetUserProfileFailed => 
createAction(UserActionTypes.GET_LOGGED_USER_PROFILE_FAILED, error))


// EDIT LOGGED USER PROFILE //
export type EditLoggedUserRequested = ActionWithPayload<UserActionTypes.EDIT_LOGGED_USER_REQUESTED, { data: FormData }>
export const editLoggedUserRequested = (data: FormData): EditLoggedUserRequested => 
createAction(UserActionTypes.EDIT_LOGGED_USER_REQUESTED, { data })

export type EditLoggedUserFailed = ActionWithPayload<UserActionTypes.EDIT_LOGGED_USER_FAILED, Error | string>  
export const editLoggedUserFailed = withMatcher((error: Error | string): EditLoggedUserFailed => 
createAction(UserActionTypes.EDIT_LOGGED_USER_FAILED, error))


// CREATE ADDRESS (LOGGED USER) //
export type CreateAddressRequested = ActionWithPayload<UserActionTypes.CREATE_ADDRESS_REQUESTED, { address: Address }>
export const createAddressRequested = withMatcher((address: Address): CreateAddressRequested => 
  createAction(UserActionTypes.CREATE_ADDRESS_REQUESTED, { address }))
// EDIT ADDRESS (LOGGED USER) //
export type EditAddressRequested = ActionWithPayload<UserActionTypes.EDIT_ADDRESS_REQUESTED, { addressId: string, address: Address }>
export const editAddressRequested = withMatcher((addressId: string, address: Address): EditAddressRequested => 
  createAction(UserActionTypes.EDIT_ADDRESS_REQUESTED, { addressId, address }))
// DELETE ADDRESS (LOGGED USER) //
export type DeleteAddressRequested = ActionWithPayload<UserActionTypes.DELETE_ADDRESS_REQUESTED, { addressId: string }>
export const deleteAddressRequested = withMatcher((addressId: string): DeleteAddressRequested => 
  createAction(UserActionTypes.DELETE_ADDRESS_REQUESTED, { addressId }))


// DELETE USER ACCOUNT (LOGGED USER) //
export type DeleteAccountRequested = ActionWithPayload<UserActionTypes.DELETE_ACCOUNT_REQUESTED, { navigate: NavigateFunction }>
export const deleteAccountRequested = withMatcher((navigate: NavigateFunction): DeleteAccountRequested =>
  createAction(UserActionTypes.DELETE_ACCOUNT_REQUESTED, { navigate }))

export type DeleteAccountSuccess = Action<UserActionTypes.DELETE_ACCOUNT_SUCCESS>
export const deleteAccountSuccess = withMatcher((): DeleteAccountSuccess =>
  createAction(UserActionTypes.DELETE_ACCOUNT_SUCCESS))

export type DeleteAccountFailed = ActionWithPayload<UserActionTypes.DELETE_ACCOUNT_FAILED, Error>
export const deleteAccountFailed = withMatcher((error: Error): DeleteAccountFailed => 
  createAction(UserActionTypes.DELETE_ACCOUNT_FAILED, error))


// RESET ERROR MESSAGES //
export type ResetErrorMessagesRequested = Action<UserActionTypes.RESET_ERROR_MESSAGES>
export const resetErrorMessagesRequested = withMatcher((): ResetErrorMessagesRequested => 
  createAction(UserActionTypes.RESET_ERROR_MESSAGES))


// GET ALL USERS (ADMIN) //
export type AdminGetAllUsersRequested = Action<UserActionTypes.ADMIN_GET_ALL_USERS_REQUESTED>
export const adminGetAllUsersRequested = withMatcher((): AdminGetAllUsersRequested =>
  createAction(UserActionTypes.ADMIN_GET_ALL_USERS_REQUESTED))

export type AdminGetAllUsersSuccess = ActionWithPayload<UserActionTypes.ADMIN_GET_ALL_USERS_SUCCESS, User[]>
export const adminGetAllUsersSuccess = withMatcher((users: User[]): AdminGetAllUsersSuccess => 
  createAction(UserActionTypes.ADMIN_GET_ALL_USERS_SUCCESS, users))

export type AdminGetAllUsersFailed = ActionWithPayload<UserActionTypes.ADMIN_GET_ALL_USERS_FAILED, Error>
export const adminGetAllUsersFailed = withMatcher((error: Error): AdminGetAllUsersFailed => 
  createAction(UserActionTypes.ADMIN_GET_ALL_USERS_FAILED, error))

  // GET USER BY ID (ADMIN) //

  // EDIT USER BY ID (ADMIN) //

  // DELETE USER BY ID (ADMIN) //