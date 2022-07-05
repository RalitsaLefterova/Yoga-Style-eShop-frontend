import CollectiosActionTypes from './collections.types'

const INITIAL_STATE = {
  collectionsList: [],
  errorMessage: ''
}

const collectionsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case CollectiosActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collectionsList: payload
      }

    case CollectiosActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload
      }

    default:
      return state
  }

}

export default collectionsReducer