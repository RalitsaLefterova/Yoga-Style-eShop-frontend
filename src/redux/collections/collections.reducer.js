import CollectiosActionTypes from './collections.types'

const INITIAL_STATE = {
  collectionsList: [],
  selectedCollectionProducts: [],
  isLoading: false,
  error: null
}

const collectionsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case CollectiosActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isLoading: true
      }

    case CollectiosActionTypes.FETCH_COLLECTIONS_SUCCESS:
      console.log('in reducer', payload)
      return {
        ...state,
        isLoading: false,
        collectionsList: payload
      }

    case CollectiosActionTypes.FETCH_COLLECTIONS_FAILURE:
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