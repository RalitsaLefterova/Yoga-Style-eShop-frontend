import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  token: '',
  errorLogIn: null,
  errorSignUp: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        errorLogIn: null,
        errorSignUp: null
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: '',
        errorLogIn: null,
        errorSignUp: null
      }
    case UserActionTypes.SIGN_UP_FAILURE:
      console.log('action payload', action.payload)
      return {
        ...state,
        errorSignUp: action.payload
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      console.log('action payload', action.payload)
      return {
        ...state,
        errorLogIn: action.payload
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
