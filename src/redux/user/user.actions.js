import UserActionTypes from './user.types'

export const setCurrentUser = ({user, token}) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: {user, token}
})

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
})

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const resetErrorMessage = () => ({
  type: UserActionTypes.RESET_ERROR_MESSAGE
})

export const deleteAccountSuccess = () => ({
  type: UserActionTypes.DELETE_ACCOUNT_SUCCESS
})