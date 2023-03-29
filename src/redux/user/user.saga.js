import { takeLatest, put, all, call, select } from 'redux-saga/effects'

import UserActionTypes from './user.types'
import { 
  signup, 
  login, 
  googleLogin, 
  logout,
  getUserProfile,
  editUserInfo,
  deleteAccount,
  forgotPassword,
  resetPassword
} from '../../rest-api/users'
import { 
  createAddress,
  editAddress,
  deleteAddress
} from '../../rest-api/addresses' 
import { 
  setCurrentUser, 
  setToken, 
  signInFailed, 
  signOutSuccess, 
  signOutFailed, 
  signUpFailed,
  sessionExpired,
  getUserProfileFailed,
  editUserFailed,
  toggleIsUpsert,
  deleteAccountFailed,
  deleteAccountSuccess,
  resetErrorMessagesRequested,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordSuccess,
  resetPasswordFailed
} from './user.actions'
import { 
  setOrders 
} from '../orders/orders.actions'
import { 
  closeCartRequested, 
  setCartProducts 
} from '../cart/cart.actions'

export function* setDataAfterAuthSuccess({ user, token, cart }) {
  yield put(setCurrentUser(user))
  yield put(setToken(token))
  yield put(setCartProducts(cart))
}

export function* signUp({ payload: { email, password, fullName } }) {
  try {
    const signUpResponse = yield call(signup, { email, password, fullName })
    if (signUpResponse.isAxiosError) {
      throw new Error(signUpResponse.response.data)
    }
    if (signUpResponse.data) {
      const { user, token, cart } = signUpResponse.data
      yield call(setDataAfterAuthSuccess, { user, token, cart })
    }
  } catch (error) {
    console.log({error})
    yield put(signUpFailed(error.message))
  }
}

export function* onSignUpRequested() {
  yield takeLatest(UserActionTypes.SIGN_UP_REQUESTED, signUp)
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const loginResponse = yield call(login, { email, password })
    console.log({loginResponse})
    if (loginResponse.isAxiosError) {
      throw new Error(loginResponse.response.data)
    }
    const { user, token, cart } = loginResponse.data
    yield call(setDataAfterAuthSuccess, { user, token, cart })
  } catch (error) {
    yield put(signInFailed(error.message))
  }
}

export function* onEmailSignInRequested() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_REQUESTED, signInWithEmail)
}

export function* sessionExpiredTest({ payload : { navigate } }) {
  try {
    yield put(sessionExpired())
  } catch (error) {
    console.log('sessionExpiredTest', error)
  }
}

export function* onSessionExpired() {
  yield takeLatest(UserActionTypes.SESSION_EXPIRED, sessionExpiredTest)
}

export function* forgotPasswordAsync({ payload: { email }}) {
  try {
    const forgotPasswordResponse = yield call(forgotPassword, { email })
    console.log({forgotPasswordResponse})
    if (forgotPasswordResponse.isAxiosError) {
      throw new Error(forgotPasswordResponse.response.data)
    }
    if (forgotPasswordResponse.data) {
      yield put(forgotPasswordSuccess())
    }
  } catch (error) {
    console.log('forgotPassword error', error)
    yield put(forgotPasswordFailed(error.message))
  }
}

export function* onForgotPasswordRequested() {
  yield takeLatest(UserActionTypes.FORGOT_PASSWORD_REQUESTED, forgotPasswordAsync)
}

export function* resetPasswordAsync({ payload: { userId, resetToken, password }}) {
  try {
    const resetPasswordResponse = yield call(resetPassword, {userId, resetToken, password})
    console.log({resetPasswordResponse})
    if (resetPasswordResponse.isAxiosError) {
      throw new Error(resetPasswordResponse.response.data)
    }
    if (resetPasswordResponse.data) {
      yield put(resetPasswordSuccess())
    }
  } catch (error) {
    console.log('resetPassword error', error)
    yield put(resetPasswordFailed(error.message))
  }
}

export function* onResetPasswordRequested() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD_REQUESTED, resetPasswordAsync)
}

// SIGN OUT //
export function* signOut({ payload : { navigate } }) {
  try {
    console.log('in try navigate', navigate('/sign-in') )
    yield call(logout)
    yield put(closeCartRequested())
    yield put(signOutSuccess())
    navigate('/sign-in')
  } catch (error) {
    yield put(signOutFailed(error))
  }
}
export function* onSignOutRequested() {
  yield takeLatest(UserActionTypes.SIGN_OUT_REQUESTED, signOut)
}

export function* signInWithGoogle({ payload: tokenId }) {
  try {
    const response = yield call(googleLogin, tokenId)
    const { user, token, cart } = response.data
    yield call(setDataAfterAuthSuccess, { user, token, cart })
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* onGoogleSignInRequested() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_REQUESTED, signInWithGoogle)
}

export function* getUserProfileAsync() {
  try {
    const response = yield call(getUserProfile)
    yield put(setCurrentUser(response.data.user))
    yield put(setOrders(response.data.orders))
  } catch (error) {
    console.log('saga -> getUserProfileAsync', {error})
    yield put(getUserProfileFailed(error))
  }
}

export function* onGetUserProfileRequested() {
  yield takeLatest(UserActionTypes.GET_USER_PROFILE_REQUESTED, getUserProfileAsync)
}

export function* editUserAsync({ payload: { data }}) {
  try {
    const response = yield call(editUserInfo, data)
    yield put(setCurrentUser(response.data))

    const isUpsert = yield select(state => state.user.isUpsert)
    if (isUpsert) {
      yield put(toggleIsUpsert())
    }
  } catch (error) {
    let errorMessage = error.response?.statusText || 'Something went wrong.'
    yield put(editUserFailed(errorMessage))
  }
}

export function* onEditUserRequested() {
  yield takeLatest(UserActionTypes.EDIT_USER_REQUESTED, editUserAsync)
}

export function* createAddressAsync({ payload: { data }}) {
  try {
    const response = yield call(createAddress, data)
    yield put(setCurrentUser(response.data))
    yield put(toggleIsUpsert())
  } catch (error) {
    let errorMessage = error.response?.statusText || 'Something went wrong.'
    yield put(editUserFailed(errorMessage))
  }
}

export function* onCreateAddressRequested() {
  yield takeLatest(UserActionTypes.CREATE_ADDRESS_REQUESTED, createAddressAsync)
}

export function* editAddressAsync({ payload: { id, data }}) {
  try {
    const response = yield call(editAddress, id, data)
    yield put(setCurrentUser(response.data))
    yield put(toggleIsUpsert())
  } catch (error) {
    let errorMessage = error.response?.statusText || 'Something went wrong.'
    yield put(editUserFailed(errorMessage))
  }
}

export function* onEditAddressRequested() {
  yield takeLatest(UserActionTypes.EDIT_ADDRESS_REQUESTED, editAddressAsync)
}

export function* deleteAddressAsync({ payload: { id }}) {
  try {
    const response = yield call(deleteAddress, id)
    yield put(setCurrentUser(response.data))
  } catch (error) {
    let errorMessage = error.response?.statusText || 'Something went wrong.'
    yield put(editUserFailed(errorMessage))
  }
}

export function* onDeleteAddressRequested() {
  yield takeLatest(UserActionTypes.DELETE_ADDRESS_REQUESTED, deleteAddressAsync)
}

export function* deleteAccountAsync({ payload: { navigate }}) {
  try {
    const response = yield call(deleteAccount)
    console.log('delete account responce: ', response)
    yield put(deleteAccountSuccess())
    navigate('/')
  } catch (error) {
    yield put(deleteAccountFailed(error))
  }
}

export function* onDeleteAccountRequested() {
  yield takeLatest(UserActionTypes.DELETE_ACCOUNT_REQUESTED, deleteAccountAsync)
}

export function* resetErrorMessagesAsync() {
  yield put(resetErrorMessagesRequested())
}

export function* onResetErrorMessagesRequested() {
  yield takeLatest(UserActionTypes.RESET_ERROR_MESSAGES, resetErrorMessagesAsync)
}

export function* userSaga() {
  yield all([
    call(onEmailSignInRequested),
    call(onGoogleSignInRequested),
    call(onSignUpRequested),
    call(onSignOutRequested),
    call(onSessionExpired),
    call(onForgotPasswordRequested),
    call(onResetPasswordRequested),
    call(onGetUserProfileRequested),
    call(onEditUserRequested),
    call(onCreateAddressRequested),
    call(onEditAddressRequested),
    call(onDeleteAddressRequested),
    call(onDeleteAccountRequested),
    call(onResetErrorMessagesRequested)
  ])
}