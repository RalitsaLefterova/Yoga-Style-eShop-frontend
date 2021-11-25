import UserActionTypes from './user.types'

export const setCurrentUser = ({user, token}) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: {user, token}
})