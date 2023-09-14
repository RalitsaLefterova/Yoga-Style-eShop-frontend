import { AnyAction } from 'redux'

import { Collection } from 'shared/types/collections'
import { Product } from 'shared/types/products'
import { ErrorResponse } from 'shared/interfaces/error-response'
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
  editCollectionPositionSuccess,
  fetchActiveCollectionsRequested
} from './collections.actions'

export type CollectionsState = {
  readonly collectionsList: Collection[]
  readonly selectedCollection: Collection
  readonly selectedCollectionProducts: Product[]
  readonly isLoading: boolean
  readonly error: ErrorResponse | Error | null
}

const INITIAL_STATE: CollectionsState = {
  collectionsList: [],
  selectedCollection: {
    _id: '',
    title: '',
    urlTitle: '',
    cover: '',
    active: false,
    collectionTeaser: ''
  },
  selectedCollectionProducts: [],
  isLoading: false,
  error: null
}

const collectionsReducer = (
  state = INITIAL_STATE, 
  action = {} as AnyAction
): CollectionsState => {
  
  if (
    fetchCollectionsRequested.match(action)||
    fetchActiveCollectionsRequested.match(action)
  ) {
    return {
      ...state,
      isLoading: true
    } 
  }

  if (
    fetchCollectionsSuccess.match(action) ||
    editCollectionPositionSuccess.match(action)
  ) {
    return {
      ...state,
      collectionsList: action.payload,
      isLoading: false
    }
  }

  if (deleteCollectionSuccess.match(action)) {
    return {
      ...state,
      collectionsList: action.payload,
      selectedCollection: {
        _id: '',
        title: '',
        urlTitle: '',
        cover: '',
        active: false,
        collectionTeaser: ''
      },
      isLoading: false,
      error: null
    }
  }

  if (
      fetchSingleCollectionSuccess.match(action) || 
      createCollectionSuccess.match(action) ||
      editCollectionSuccess.match(action)
    ) {
    return {
      ...state,
      selectedCollection: action.payload,
      isLoading: false,
      error: null
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