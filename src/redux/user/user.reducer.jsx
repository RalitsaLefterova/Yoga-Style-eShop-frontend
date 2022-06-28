import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  token: '',
  errorLogIn: null,
  errorSignUp: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        errorLogIn: null,
        errorSignUp: null
      }
    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: payload
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.DELETE_ACCOUNT_SUCCESS:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        currentUser: null,
        token: '',
        errorLogIn: null,
        errorSignUp: null
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
