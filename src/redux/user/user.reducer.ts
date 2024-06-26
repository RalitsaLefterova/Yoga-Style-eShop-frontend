import { AnyAction } from 'redux'

import { User } from 'shared/types/users'
import { 
  setCurrentUser, 
  setToken, 
  signInFailed, 
  signOutFailed, 
  signOutSuccess, 
  signUpFailed, 
  sessionExpired,
  toggleIsUpsert,
  adminGetAllUsersFailed,
  adminGetAllUsersRequested,
  adminGetAllUsersSuccess,
  deleteAccountFailed, 
  deleteAccountSuccess, 
  forgotPasswordFailed, 
  forgotPasswordSuccess, 
  resetPasswordFailed, 
  resetPasswordSuccess, 
  resetErrorMessagesRequested,
  adminEditUserByIdSuccess,
  adminEditUserByIdRequested,
  adminEditUserByIdFailed,
  adminDeleteUserByIdSuccess,
  adminGetUserByIdSuccess,
  adminGetUserByIdRequested,
  getCurrentUserShippingAddressRequested,
  getCurrentUserShippingAddressSuccess,
  getCurrentUserShippingAddressFailed
} from './user.actions'
import { Address } from 'shared/types/addresses'

export type UserState = {
  readonly currentUser: User | null
  readonly currentUserShippingAddress: Address | null
  readonly token: string
  readonly selectedUser: User | null
  readonly usersList: User[]
  readonly isLoading: boolean,
  readonly isUpsert: boolean
  readonly isResetPasswordLinkSent: boolean
  readonly isResetPasswordSuccessfull: boolean 
  readonly errorOnSignUp: Error | null
  readonly errorOnSignIn: Error | null
  readonly errorOnSignOut: Error | null
  readonly errorOnGetLoggedUser: Error | null
  readonly errorOnEditLoggedUser: Error | null
  readonly errorOnDeleteAccount: Error | null
  readonly errorOnForgotPassword: Error | null
  readonly errorOnResetPassword: Error | null
  readonly errorOnGetAllUsers: Error | null
  readonly errorOnEditUserById: Error | null
  readonly errorOnGetShippingAddress: Error | null | string
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  currentUserShippingAddress: null,
  token: '',
  selectedUser: null,
  usersList: [],
  isLoading: false,
  isUpsert: false,
  isResetPasswordLinkSent: false,
  isResetPasswordSuccessfull: false,
  errorOnSignUp: null,
  errorOnSignIn: null,
  errorOnSignOut: null,
  errorOnGetLoggedUser: null, 
  errorOnEditLoggedUser: null,
  errorOnDeleteAccount: null,
  errorOnForgotPassword: null,
  errorOnResetPassword: null,
  errorOnGetAllUsers: null,
  errorOnEditUserById: null,
  errorOnGetShippingAddress: null
}

const userReducer = (
  state = INITIAL_STATE, 
  action: AnyAction
): UserState => {

  if (setCurrentUser.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      errorOnSignUp: null,
      errorOnSignIn: null,
      errorOnSignOut: null,
      errorOnGetLoggedUser: null,
      errorOnEditLoggedUser: null,
      errorOnDeleteAccount: null,
      errorOnForgotPassword: null,
      errorOnResetPassword: null
      }
    }

    if (setToken.match(action)) {
      return {
        ...state,
        token: action.payload
      }
    }

    if (
      signOutSuccess.match(action) ||
      deleteAccountSuccess.match(action) ||
      sessionExpired.match(action)
    ) {
      return {
        ...state,
        currentUser: null,
        token: ''
      }
    }

    if (signUpFailed.match(action)) {
      return {
        ...state,
        errorOnSignUp: action.payload
      }
    }

    if (signInFailed.match(action)) {
      return {
        ...state,
        errorOnSignIn: action.payload
      }
    }

    if (signOutFailed.match(action)) {
      return {
        ...state,
        currentUser: null,
        errorOnSignOut: action.payload
      }
    }

    if (toggleIsUpsert.match(action)) {
      return {
        ...state,
        isUpsert: !state.isUpsert
      }
    }
      
    if (deleteAccountFailed.match(action)) {
      return {
        ...state,
        errorOnDeleteAccount: action.payload
      }
    }

    if (forgotPasswordSuccess.match(action)) {
      return {
        ...state,
        isResetPasswordLinkSent: true,
        errorOnForgotPassword: null
      }
    }

    if (forgotPasswordFailed.match(action)) {
      return {
        ...state,
        isResetPasswordLinkSent: false,
        errorOnForgotPassword: action.payload
      }
    }

    if (resetPasswordSuccess.match(action)) {
      return {
        ...state,
        isResetPasswordSuccessfull: true,
        errorOnResetPassword: null
      }
    }

    if (resetPasswordFailed.match(action)) {
      return {
        ...state,
        isResetPasswordSuccessfull: false,
        errorOnResetPassword: action.payload
      }
    }

    if (resetErrorMessagesRequested.match(action)) {
      return {
        ...state,
        errorOnSignUp: null,
        errorOnSignIn: null,
        errorOnSignOut: null,
        errorOnGetLoggedUser: null,
        errorOnEditLoggedUser: null,
        errorOnDeleteAccount: null,
        errorOnForgotPassword: null,
        errorOnResetPassword: null,
        // errorOnGetAllUsers: null
      }
    }

    if (
      adminGetAllUsersRequested.match(action) ||
      adminEditUserByIdRequested.match(action)
    ) {
      return {
        ...state,
        isLoading: true
      }
    }

    if (adminGetAllUsersSuccess.match(action)) {
      return {
        ...state,
        usersList: action.payload,
        isLoading: false,
        errorOnGetAllUsers: null
      }
    }


    if (adminGetAllUsersFailed.match(action)) {
      return {
        ...state,
        isLoading: false,
        errorOnGetAllUsers: action.payload
      }
    }

    if (adminGetUserByIdRequested.match(action)) {
      return {
        ...state,
        isLoading: true,
        selectedUser: null
      }
    }

    if (adminGetUserByIdSuccess.match(action)) {
      return {
        ...state,
        isLoading: false,
        selectedUser: action.payload
      }
    }

    if (adminEditUserByIdSuccess.match(action)) {
      return {
        ...state,
        isLoading: false,
        selectedUser: action.payload,
        errorOnEditUserById: null
      }
    }

    if (adminEditUserByIdFailed.match(action)) {
      return {
        ...state,
        isLoading: false,
        errorOnEditUserById: action.payload
      }
    }

    if (adminDeleteUserByIdSuccess.match(action)) {
      return {
        ...state,
        selectedUser: null
      }
    }

    if (getCurrentUserShippingAddressRequested.match(action)) {
      return {
        ...state,
        isLoading: true,
        errorOnGetShippingAddress: null
      }
    }

    if (getCurrentUserShippingAddressSuccess.match(action)) {
      return {
        ...state,
        isLoading: false,
        currentUserShippingAddress: action.payload,
        errorOnGetShippingAddress: null
      }
    }

    if (getCurrentUserShippingAddressFailed.match(action)) {
      return {
        ...state,
        isLoading: false,
        currentUserShippingAddress: null,
        errorOnGetShippingAddress: action.payload
      }
    }

  
    return state
  }

export default userReducer