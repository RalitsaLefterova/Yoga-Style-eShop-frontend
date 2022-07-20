import { createSelector } from 'reselect'

const selectUserReducer = state => state.user
const selectErrors = state => state.user.errors

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
)

export const selectErrorOnSignUp = createSelector(
  [selectErrors],
  (errorsSlice) => errorsSlice.onSignUp
)

export const selectErrorOnEditUser = createSelector(
  [selectUserReducer],
  (errorsSlice) => errorsSlice.onEditUser
) 