import CollectiosActionTypes from './collections.types'
import { createAction } from '../reducer.utils'

export const fetchCollectionsSuccess = collections =>
  createAction(CollectiosActionTypes.FETCH_COLLECTIONS_SUCCESS, collections)

export const fetchCollectionsFailure = errorMessage => 
  createAction(CollectiosActionTypes.FETCH_COLLECTIONS_FAILURE, errorMessage)