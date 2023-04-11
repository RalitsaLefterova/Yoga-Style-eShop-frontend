import { takeLatest, put, all, call, select } from 'typed-redux-saga'

import UserActionTypes from './user.types'
import { 
  signup, 
  login, 
  googleLogin, 
  logout,
  editUserInfo,
  deleteAccount,
  forgotPassword,
  resetPassword,
  getLoggedUserProfile,
  getAllUsers,
  adminGetUserById,
  adminEditUserById,
  adminDeleteUserById
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
  editLoggedUserFailed,
  toggleIsUpsert,
  deleteAccountFailed,
  deleteAccountSuccess,
  resetErrorMessagesRequested,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordSuccess,
  resetPasswordFailed,
  DeleteAccountRequested,
  SignUpRequested,
  EditAddressRequested,
  CreateAddressRequested,
  EmailSignInRequested,
  SignOutRequested,
  GoogleSignInRequested,
  ForgotPasswordRequested,
  ResetPasswordRequested,
  EditLoggedUserRequested,
  DeleteAddressRequested,
  NavigateAfterSessionExpired,
  adminGetAllUsersFailed,
  adminGetAllUsersSuccess,
  AdminGetUserByIdRequested,
  adminGetUserByIdSuccess,
  adminGetUserByIdFailed,
  AdminEditUserByIdRequested,
  adminEditUserByIdFailed,
  adminEditUserByIdSuccess,
  AdminDeleteUserByIdRequested,
  adminDeleteUserByIdFailed,
  adminDeleteUserByIdSuccess
} from './user.actions'
import { 
  setOrders 
} from '../orders/orders.actions'
import { 
  closeCartRequested, 
  setCartProducts 
} from '../cart/cart.actions'
import { User } from 'shared/types/users'
import { CartProduct } from 'shared/types/products'
import { AxiosError } from 'axios'

type SetDataAfterAuthSuccessProps = {
  user: User, 
  token: string, 
  cart: CartProduct[]
}
export function* setDataAfterAuthSuccess({ user, token, cart }: SetDataAfterAuthSuccessProps) {
  yield* put(setCurrentUser(user))
  yield* put(setToken(token))
  yield* put(setCartProducts(cart))
}

// SIGN UP //
export function* signUpAsync({ payload: { email, password, fullName } }: SignUpRequested) {
  try {
    const signUpResponse = yield* call(signup, { email, password, fullName })
    // if (signUpResponse instanceof AxiosError) {
    //   throw new Error(signUpResponse.response.data)
    // }
    if (signUpResponse.data) {
      const { user, token, cart } = signUpResponse.data
      yield* call(setDataAfterAuthSuccess, { user, token, cart })
    }
  } catch (error) {
    console.log('signUpAsync error', error)
    yield* put(signUpFailed(error as Error))
  }
}
export function* onSignUpRequested() {
  yield* takeLatest(UserActionTypes.SIGN_UP_REQUESTED, signUpAsync)
}

// SIGN IN WITH EMAIL //
export function* emailSignInAsync({ payload: { email, password }}: EmailSignInRequested) {
  try {
    const loginResponse = yield* call(login, { email, password })
    console.log({loginResponse})
    // if (loginResponse.isAxiosError) {
    //   throw new Error(loginResponse.response.data)
    // }
    const { user, token, cart } = loginResponse.data
    yield* call(setDataAfterAuthSuccess, { user, token, cart })
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}
export function* onEmailSignInRequested() {
  yield* takeLatest(UserActionTypes.EMAIL_SIGN_IN_REQUESTED, emailSignInAsync)
}

// SIGN IN WITH GOOGLE //
export function* googleSignInAsync({ payload: tokenId }: GoogleSignInRequested) {
  try {
    const response = yield* call(googleLogin, tokenId)
    const { user, token, cart } = response.data
    yield* call(setDataAfterAuthSuccess, { user, token, cart })
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}
export function* onGoogleSignInRequested() {
  yield* takeLatest(UserActionTypes.GOOGLE_SIGN_IN_REQUESTED, googleSignInAsync)
}

// SESSION EXPIRED //
export function* navigateAfterSessionExpiredAsync({ payload: { navigate }}: NavigateAfterSessionExpired) {
  try {
    yield* put(sessionExpired())
    navigate('/sign-in')
  } catch (error) {
    console.log('sessionExpired error', error)
  }
}
export function* onNavigateAfterSessionExpired() {
  yield* takeLatest(UserActionTypes.NAVIGATE_AFTER_SESSION_EXPIRED, navigateAfterSessionExpiredAsync)
}

// FORGOT PASSWORD //
export function* forgotPasswordAsync({ payload: { email }}: ForgotPasswordRequested) {
  try {
    const forgotPasswordResponse = yield* call(forgotPassword, { email })
    console.log({forgotPasswordResponse})
    // if (forgotPasswordResponse.isAxiosError) {
    //   throw new Error(forgotPasswordResponse.response.data)
    // }
    if (forgotPasswordResponse.data) {
      yield* put(forgotPasswordSuccess())
    }
  } catch (error) {
    // console.log('forgotPassword error', error)
    yield* put(forgotPasswordFailed(error as Error))
  }
}
export function* onForgotPasswordRequested() {
  yield* takeLatest(UserActionTypes.FORGOT_PASSWORD_REQUESTED, forgotPasswordAsync)
}

// RESET PASSWORD //
export function* resetPasswordAsync({ payload: { userId, resetToken, password }}: ResetPasswordRequested) {
  try {
    const resetPasswordResponse = yield* call(resetPassword, userId, resetToken, password)
    console.log({resetPasswordResponse})
    // if (resetPasswordResponse.isAxiosError) {
    //   throw new Error(resetPasswordResponse.response.data)
    // }
    if (resetPasswordResponse.data) {
      yield* put(resetPasswordSuccess())
    }
  } catch (error) {
    // console.log('resetPassword error', error)
    yield* put(resetPasswordFailed(error as Error))
  }
}
export function* onResetPasswordRequested() {
  yield* takeLatest(UserActionTypes.RESET_PASSWORD_REQUESTED, resetPasswordAsync)
}

// SIGN OUT //
export function* signOutAsync({ payload : { navigate } }: SignOutRequested) {
  try {
    console.log('in signOutAsync')
    const logoutResponse = yield* call(logout)
    console.log({logoutResponse})
    yield* put(closeCartRequested())
    yield* put(signOutSuccess())
    navigate('/sign-in')
  } catch (error) {
    yield* put(signOutFailed(error as Error))
  }
}
export function* onSignOutRequested() {
  yield* takeLatest(UserActionTypes.SIGN_OUT_REQUESTED, signOutAsync)
}

// GET LOGGED USER PROFILE //
export function* getLoggedUserProfileAsync() {
  try {
    const getLoggedUserProfileResponse = yield* call(getLoggedUserProfile)
    yield* put(setCurrentUser(getLoggedUserProfileResponse.data.user))
    yield* put(setOrders(getLoggedUserProfileResponse.data.orders))
  } catch (error) {
    // console.log('saga -> getUserProfileAsync', {error})
    yield* put(getUserProfileFailed(error as Error))
  }
}
export function* onGetLoggedUserProfileRequested() {
  yield* takeLatest(UserActionTypes.GET_LOGGED_USER_PROFILE_REQUESTED, getLoggedUserProfileAsync)
}

// EDIT LOGGED USER PROFILE //
export function* editLoggedUserAsync({ payload: { data }}: EditLoggedUserRequested) {
  try {
    const response = yield* call(editUserInfo, data)
    yield* put(setCurrentUser(response.data))

    const isUpsert = yield* select(state => state.user.isUpsert)
    if (isUpsert) {
      yield* put(toggleIsUpsert())
    }
  } catch (error) {
    yield* put(editLoggedUserFailed(error as Error))
  }
}
export function* onEditLoggedUserRequested() {
  yield* takeLatest(UserActionTypes.EDIT_LOGGED_USER_REQUESTED, editLoggedUserAsync)
}

// CREATE ADDRESS (LOGGED USER) //
export function* createAddressAsync({payload: { address }}: CreateAddressRequested) {
  try {
    const createAddressResponse = yield* call(createAddress, address)
    if (createAddressResponse.data) {
      yield* put(setCurrentUser(createAddressResponse.data))
    }
    yield* put(toggleIsUpsert())
  } catch (error) {
    yield* put(editLoggedUserFailed(error as Error))
  }
}
export function* onCreateAddressRequested() {
  yield* takeLatest(UserActionTypes.CREATE_ADDRESS_REQUESTED, createAddressAsync)
}

// EDIT ADDRESS (LOGGED USER) //
export function* editAddressAsync({ payload: { addressId, address }}: EditAddressRequested) {
  try {
    const response = yield* call(editAddress, addressId, address)
    yield* put(setCurrentUser(response.data))
    yield* put(toggleIsUpsert())
  } catch (error) {
    yield* put(editLoggedUserFailed(error as Error))
  }
}
export function* onEditAddressRequested() {
  yield* takeLatest(UserActionTypes.EDIT_ADDRESS_REQUESTED, editAddressAsync)
}

// DELETE ADDRESS (LOGGED USER) //
export function* deleteAddressAsync({ payload: { addressId }}: DeleteAddressRequested) {
  try {
    const response = yield* call(deleteAddress, addressId)
    yield* put(setCurrentUser(response.data))
  } catch (error) {
    yield* put(editLoggedUserFailed(error as Error))
  }
}
export function* onDeleteAddressRequested() {
  yield* takeLatest(UserActionTypes.DELETE_ADDRESS_REQUESTED, deleteAddressAsync)
}

// DELETE USER ACCOUNT (LOGGED USER) //
export function* deleteAccountAsync({ payload: { navigate }}: DeleteAccountRequested) {
  try {
    const deleteAccountResponse = yield* call(deleteAccount)
    console.log('delete account responce: ', deleteAccountResponse)
    yield* put(deleteAccountSuccess())
    navigate('/')
  } catch (error) {
    yield* put(deleteAccountFailed(error as Error))
  }
}
export function* onDeleteAccountRequested() {
  yield* takeLatest(UserActionTypes.DELETE_ACCOUNT_REQUESTED, deleteAccountAsync)
}

// RESET ERROR MESSAGES //
export function* resetErrorMessagesAsync() {
  yield* put(resetErrorMessagesRequested())
}
export function* onResetErrorMessagesRequested() {
  yield* takeLatest(UserActionTypes.RESET_ERROR_MESSAGES, resetErrorMessagesAsync)
}

// GET ALL USERS (ADMIN) //
export function* adminGetAllUsersAsync() {
  try {
    const adminGetAllUsersResponse = yield* call(getAllUsers)
    if (adminGetAllUsersResponse.data) {
      yield* put(adminGetAllUsersSuccess(adminGetAllUsersResponse.data))
    }
  } catch (error) {
    yield put(adminGetAllUsersFailed(error as Error))
  }
}
export function* onAdminGetAllUsersRequested() {
  yield* takeLatest(UserActionTypes.ADMIN_GET_ALL_USERS_REQUESTED, adminGetAllUsersAsync)
}

// GET USER BY ID (ADMIN) //
export function* adminGetUserByIdAsync({ payload: { userId }}: AdminGetUserByIdRequested) {
  console.log('in saga adminGetUserByIdAsync')
  try {
    const adminGetUserByIdResponse = yield* call(adminGetUserById, userId)
    if (adminGetUserByIdResponse.data) {
      yield* put(adminGetUserByIdSuccess(adminGetUserByIdResponse.data))
    }
  } catch (error) {
    yield* put(adminGetUserByIdFailed(error as Error))
  }
}
export function* onAdminGetUserByIdRequested() {
  yield* takeLatest(UserActionTypes.ADMIN_GET_USER_BY_ID_REQUESTED, adminGetUserByIdAsync)
}

// EDIT USER BY ID (ADMIN) //
export function* adminEditUserByIdAsync({ payload: { userId, data }}: AdminEditUserByIdRequested) {
  try {
    const adminEditUserByIdResponse = yield* call(adminEditUserById, userId, data)
    yield* put(adminEditUserByIdSuccess(adminEditUserByIdResponse.data))
  } catch (error) {
    yield* put(adminEditUserByIdFailed(error as Error))
  }
}
export function* onAdminEditUserByIdRequested() {
  yield* takeLatest(UserActionTypes.ADMIN_EDIT_USER_BY_ID_REQUESTED, adminEditUserByIdAsync)
}

// DELETE USER BY ID (ADMIN) //
export function* adminDeleteUserByIdAsync({ payload: { userId, navigate }}: AdminDeleteUserByIdRequested) {
  try {
    const adminDeleteUserByIdResponse = yield* call(adminDeleteUserById, userId)
    navigate('/admin/users')
    yield* put(adminDeleteUserByIdSuccess())
  } catch (error) {
    yield* put(adminDeleteUserByIdFailed(error as Error))
  }
}
export function* onAdminDeleteUserByIdRequested() {
  yield* takeLatest(UserActionTypes.ADMIN_DELETE_USER_BY_ID_REQUESTED, adminDeleteUserByIdAsync)
}

export function* userSaga() {
  yield* all([
    call(onEmailSignInRequested),
    call(onGoogleSignInRequested),
    call(onSignUpRequested),
    call(onSignOutRequested),
    call(onNavigateAfterSessionExpired),
    call(onForgotPasswordRequested),
    call(onResetPasswordRequested),
    call(onGetLoggedUserProfileRequested),
    call(onEditLoggedUserRequested),
    call(onCreateAddressRequested),
    call(onEditAddressRequested),
    call(onDeleteAddressRequested),
    call(onDeleteAccountRequested),
    call(onResetErrorMessagesRequested),
    call(onAdminGetAllUsersRequested),
    call(onAdminGetUserByIdRequested),
    call(onAdminEditUserByIdRequested),
    call(onAdminDeleteUserByIdRequested)
  ])
}