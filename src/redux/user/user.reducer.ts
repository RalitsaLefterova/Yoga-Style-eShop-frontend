import { AnyAction } from 'redux'
import { GenericObject } from 'shared/types/common';

import { User } from 'shared/types/users';
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
  adminGetUserByIdRequested
} from './user.actions';

export type UserState = {
  readonly currentUser: User | null
  readonly token: string
  readonly selectedUser: User | GenericObject | null
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
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  token: '',
  selectedUser: {},
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
  errorOnEditUserById: null
};

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
      adminGetUserByIdRequested.match(action) ||
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
  
    return state
  }

export default userReducer