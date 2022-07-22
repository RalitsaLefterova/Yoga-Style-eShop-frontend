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

export const selectIsEdit = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.isEdit
)

export const selectErrorOnSignUp = createSelector(
  [selectErrors],
  (errorsSlice) => errorsSlice.onSignUp
)

export const selectErrorOnEditUser = createSelector(
  [selectErrors],
  (errorsSlice) => errorsSlice.onEditUser
) 