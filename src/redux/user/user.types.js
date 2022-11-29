const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_TOKEN: 'SET_TOKEN',
  TOGGLE_IS_UPSERT: 'TOGGLE_IS_UPSERT',

  SIGN_UP_REQUESTED: 'SIGN_UP_REQUESTED',
  SIGN_UP_FAILED: 'SIGN_UP_FAILED',

  EMAIL_SIGN_IN_REQUESTED: 'EMAIL_SIGN_IN_REQUESTED',
  GOOGLE_SIGN_IN_REQUESTED: 'GOOGLE_SIGN_IN_REQUESTED',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED',

  SIGN_OUT_REQUESTED: 'SIGN_OUT_REQUESTED',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',

  GET_USER_PROFILE_REQUESTED: 'GET_USER_PROFILE_REQUESTED',
  GET_USER_PROFILE_FAILED: 'GET_USER_PROFILE_FAILED',

  EDIT_USER_REQUESTED: 'EDIT_USER_REQUESTED',
  EDIT_USER_FAILED: 'EDIT_USER_FAILED',
  CREATE_ADDRESS_REQUESTED: 'CREATE_ADDRESS_REQUESTED',
  EDIT_ADDRESS_REQUESTED: 'EDIT_ADDRESS_REQUESTED',
  DELETE_ADDRESS_REQUESTED: 'DELETE_ADDRESS_REQUESTED',
  
  DELETE_ACCOUNT_REQUESTED: 'DELETE_ACCOUNT_REQUESTED',
  DELETE_ACCOUNT_SUCCESS: 'DELETE_ACCOUNT_SUCCESS',
  DELETE_ACCOUNT_FAILED: 'DELETE_ACCOUNT_FAILED',

  RESET_ERROR_MESSAGES: 'RESET_ERROR_MESSAGES',
}

export default UserActionTypes;