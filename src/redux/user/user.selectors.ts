import { RootState } from 'redux/root-reducer'
import { createSelector } from 'reselect'
import { UserState } from './user.reducer'

const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
)

export const selectIsResetPasswordLinkSent = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.isResetPasswordLinkSent
  }
)

export const selectIsResetPasswordSuccessfull = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.isResetPasswordSuccessfull
  }
)

export const selectIsUpsert = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isUpsert
)

export const selectErrorOnSignIn = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorOnSignIn
)

export const selectErrorOnSignUp = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorOnSignUp
)

export const selectErrorOnEditLoggedUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorOnEditLoggedUser
) 

export const selectErrorOnForgotPassword = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorOnForgotPassword
)

export const selectErrorOnResetPassword = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorOnResetPassword
)

export const selectUsersList = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.usersList
)

export const selectSelectedUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.selectedUser
)

export const selectCurrentUserShippingAddress = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUserShippingAddress
)

export const selectErrorOnGetShippingAddress = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorOnGetShippingAddress
)