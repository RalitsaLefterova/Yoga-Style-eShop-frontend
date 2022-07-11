import { createSelector } from 'reselect'

const selectUserReducer = state => state.user

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
)

export const selectErrorOnSIgnUp = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.errorSignUp
)