import { createSelector } from 'reselect'

const selectUserReducer = state => state.user

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
)

export const selectErrors = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errors
)

export const selectIsUpsert = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isUpsert
)

export const selectErrorOnSignIn = createSelector(
  [selectErrors],
  (errorsSlice) => errorsSlice.onSignIn
)

export const selectErrorOnSignUp = createSelector(
  [selectErrors],
  (errorsSlice) => errorsSlice.onSignUp
)

export const selectErrorOnEditUser = createSelector(
  [selectErrors],
  (errorsSlice) => errorsSlice.onEditUser
) 