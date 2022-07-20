import { takeLatest, put, all, call } from 'redux-saga/effects'

import UserActionTypes from './user.types'
import { 
  signup, 
  login, 
  googleLogin, 
  logout,
  getUserProfile,
  editUserInfo
} from '../../rest-api/users'
import { 
  setCurrentUser, 
  setToken, 
  signInFailed, 
  signOutSuccess, 
  signOutFailed, 
  signUpFailed,
  getUserProfileFailed,
  editUserFailed
} from './user.actions'
import { setCart } from '../cart/cart.actions'

export function* setDataAfterAuthSuccess({ user, token, cart }) {
  yield put(setCurrentUser(user))
  yield put(setToken(token))
  yield put(setCart(cart))
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
    yield put(signUpFailed(error))
  }
}

export function* onSignUpRequested() {
  yield takeLatest(UserActionTypes.SIGN_UP_REQUESTED, signUp)
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const loginResponse = yield call(login, { email, password })
    if (loginResponse.isAxiosError) {
      throw new Error(loginResponse.response.data)
    }
    const { user, token, cart } = loginResponse.data
    yield call(setDataAfterAuthSuccess, { user, token, cart })
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* onEmailSignInRequested() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_REQUESTED, signInWithEmail)
}

export function* signOut({ payload : { navigate } }) {
  try {
    yield call(logout)
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
    yield put(setCurrentUser(response))
  } catch (error) {
    yield put(getUserProfileFailed(error))
  }
}

export function* onGetUserProfileRequested() {
  yield takeLatest(UserActionTypes.GET_USER_PROFILE_REQUESTED, getUserProfileAsync)
}

export function* editUserAsync({ payload: { data }}) {
  try {
    const response = yield call(editUserInfo, data)
    yield put(setCurrentUser(response))
  } catch (error) {
    yield put(editUserFailed(error))
  }
}

export function* onEditUserRequested() {
  yield takeLatest(UserActionTypes.EDIT_USER_REQUESTED, editUserAsync)
}

export function* userSaga() {
  yield all([
    call(onEmailSignInRequested),
    call(onGoogleSignInRequested),
    call(onSignUpRequested),
    call(onSignOutRequested),
    call(onGetUserProfileRequested),
    call(onEditUserRequested)
  ])
}