import CollectionsActionTypes from './collections.types'
import { createAction } from '../reducer.utils'
import { getCollectionsShortInfo } from '../../rest-api/collections'

export const fetchCollectionsStart = () =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_START)

export const fetchCollectionsSuccess = collections =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS, collections)

export const fetchCollectionsFailure = error => 
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_FAILURE, error)

export const fetchCollectionsShortInfoAsync = () => async (dispatch) => {
  try {
    const collectionsResult = await getCollectionsShortInfo()
    dispatch(fetchCollectionsSuccess(collectionsResult.data))
  } catch (error) {
    dispatch(fetchCollectionsFailure(error))
  }
}