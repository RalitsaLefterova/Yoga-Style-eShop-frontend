import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,
  token: '',
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token,
        error: null
      }
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      }

    default:
      return state

  }
}

export default userReducer
