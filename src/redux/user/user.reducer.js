import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  token: '',
  isEdit: false,
  errors: {
    onSignUp: null,
    onSignIn: null,
    onSignOut: null,
    onEditUser: null
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
          onEditUser: null
        }
      }

    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: payload
      }

    case UserActionTypes.TOGGLE_IS_EDIT:
      return {
        ...state,
        isEdit: !state.isEdit
      }

    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.DELETE_ACCOUNT_SUCCESS:
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

    case UserActionTypes.GET_USER_PROFILE_FAILED:
    case UserActionTypes.EDIT_USER_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          onEditUser: payload
        }
      }

    case UserActionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        errors: {
          onSignUp: null,
          onSignIn: null,
          onSignOut: null,
          onEditUser: null
        }
      }

    default:
      return state
  }
}

export default userReducer
