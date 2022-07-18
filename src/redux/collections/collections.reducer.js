import CollectionsActionTypes from './collections.types'

const INITIAL_STATE = {
  collectionsList: [],
  selectedCollectionProducts: [],
  isLoading: false,
  error: null
}

const collectionsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS:
      console.log('in reducer', payload)
      return {
        ...state,
        isLoading: false,
        collectionsList: payload
      }

    case CollectionsActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      }

    default:
      return state
  }
}

export default collectionsReducer