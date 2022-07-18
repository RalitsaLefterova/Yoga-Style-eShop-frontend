import CollectionsActionTypes from './collections.types'
import { createAction } from '../reducer.utils'

export const fetchCollectionsRequested = () =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED)

export const fetchCollectionsShortInfoRequested = () =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_SHORT_INFO_REQUESTED)

export const fetchCollectionsSuccess = collections =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS, collections)

export const fetchCollectionsFailure = error => 
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_FAILURE, error)