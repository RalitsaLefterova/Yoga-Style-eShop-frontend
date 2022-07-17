import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  token: '',
  errors: {
    onSignUp: null,
    onSignIn: null,
    onSignOut: null
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
          onSignOut: null
        }
      }

    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: payload
      }

    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: '',
        errors: {
          onSignUp: null,
          onSignIn: null,
          onSignOut: null
        }
      }

    case UserActionTypes.SIGN_UP_FAILED:
      return {
        ...state,
        errors: {
          ...errors,
          onSignUp: payload,
          onSignIn: null
        }
      }

      case UserActionTypes.SIGN_IN_FAILED:
        return {
          ...state,
          errors: {
            ...errors,
            onSignUp: null,
            onSignIn: payload,
          }
        }

    case UserActionTypes.SIGN_OUT_FAILED:
      return {
        ...state,
        errors: {
          onSignIn: null,
          onSignUp: null,
          onSignOut: payload
        }
      }

    case UserActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        errorLogIn: null,
        errorSignUp: null
      }

    default:
      return state
  }
}

export default userReducer
