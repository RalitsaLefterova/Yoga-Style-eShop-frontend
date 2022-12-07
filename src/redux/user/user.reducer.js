import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  token: '',
  isUpsert: false,
  isResetPasswordLinkSent: false,
  isResetPasswordSuccessfull: false,
  errors: {
    onSignUp: null,
    onSignIn: null,
    onSignOut: null,
    onEditUser: null,
    onDeleteAccount: null,
    onForgotPassword: null,
    onResetPassword: null
  }
};

const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action
  // console.log('in user reducer', type, payload)

  switch (type) {

    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        errors: {
          onSignUp: null,
          onSignIn: null,
          onSignOut: null,
          onEditUser: null,
          onDeleteAccount: null
        }
      }

    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: payload
      }

    case UserActionTypes.TOGGLE_IS_UPSERT:
      return {
        ...state,
        isUpsert: !state.isUpsert
      }

    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.DELETE_ACCOUNT_SUCCESS:
    case UserActionTypes.SESSION_EXPIRED:
      return {
        ...state,
        currentUser: null,
        token: ''
      }

    case UserActionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          onSignUp: payload
        }
      }

    case UserActionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          onSignIn: payload
        }
      }

    case UserActionTypes.SIGN_OUT_FAILED:
      return {
        ...state,
        currentUser: null,
        errors: {
          ...state.errors,
          onSignOut: payload
        }
      }

    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetPasswordLinkSent: true,
        errors: {
          ...state.errors,
          onForgotPassword: null
        }
      }

    case UserActionTypes.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isResetPasswordLinkSent: false,
        errors: {
          ...state.errors,
          onForgotPassword: payload
        }
      }

    case UserActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isResetPasswordSuccessfull: true,
        errors: {
          ...state.errors,
          onResetPassword: null
        }
      }

    case UserActionTypes.RESET_PASSWORD_FAILED:
      return {
        ...state,
        isResetPasswordSuccessfull: false,
        errors: {
          ...state.errors,
          onResetPassword: payload
        }
      }

    case UserActionTypes.GET_USER_PROFILE_FAILED:
    case UserActionTypes.EDIT_USER_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          onEditUser: payload
        }
      }

    case UserActionTypes.DELETE_ACCOUNT_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          onDeleteAccount: payload
        }
      }

    case UserActionTypes.RESET_ERROR_MESSAGES:
      return {
        ...state,
        isUpsert: false,
        errors: {
          onSignUp: null,
          onSignIn: null,
          onSignOut: null,
          onEditUser: null,
          onDeleteAccount: null
        }
      }

    default:
      return {
        ...state
      }
  }
}

export default userReducer