import { AnyAction } from 'redux'

import { Collection } from 'shared/types/collections'
import { Product } from 'shared/types/products'
import { 
  fetchCollectionsRequested,
  fetchCollectionsSuccess,
  fetchCollectionsFailed,
  fetchSingleCollectionSuccess,
  fetchSingleCollectionFailed,
  createCollectionSuccess,
  createCollectionFailed,
  editCollectionSuccess,
  editCollectionFailed,
  deleteCollectionSuccess,
  deleteCollectionFailed,
  editCollectionPositionSuccess
} from './collections.actions'

export type CollectionsState = {
  readonly collectionsList: Collection[]
  readonly selectedCollection: Collection
  readonly selectedCollectionProducts: Product[]
  readonly isLoading: boolean
  readonly error: Error | null
}

const INITIAL_STATE: CollectionsState = {
  collectionsList: [],
  selectedCollection: {},
  selectedCollectionProducts: [],
  isLoading: false,
  error: null
}

const collectionsReducer = (
  state = INITIAL_STATE, 
  action = {} as AnyAction
): CollectionsState => {
  
  if (fetchCollectionsRequested.match(action)) {
    return {
      ...state,
      isLoading: true
    } 
  }

  if (
    fetchCollectionsSuccess.match(action) ||
    deleteCollectionSuccess.match(action) ||
    editCollectionPositionSuccess.match(action)
  ) {
    return {
      ...state,
      collectionsList: action.payload,
      isLoading: false
    }
  }

  if (
      fetchSingleCollectionSuccess.match(action) || 
      createCollectionSuccess.match(action) ||
      editCollectionSuccess.match(action)
    ) {
    return {
      ...state,
      selectedCollection: action.payload
    }
  }

  if (
    fetchCollectionsFailed.match(action) || 
    fetchSingleCollectionFailed.match(action) || 
    createCollectionFailed.match(action) ||
    editCollectionFailed.match(action) ||
    deleteCollectionFailed.match(action)
  ) {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    }
  }
  
  return state
}

export default collectionsReducer