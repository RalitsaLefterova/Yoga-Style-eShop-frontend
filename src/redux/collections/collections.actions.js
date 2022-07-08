import CollectiosActionTypes from './collections.types'
import { createAction } from '../reducer.utils'
import { getCollections, getCollectionsShortInfo } from '../../rest-api/collections'

export const fetchCollectionsStart = () =>
  createAction(CollectiosActionTypes.FETCH_COLLECTIONS_START)

export const fetchCollectionsSuccess = collections =>
  createAction(CollectiosActionTypes.FETCH_COLLECTIONS_SUCCESS, collections)

export const fetchCollectionsFailure = error => 
  createAction(CollectiosActionTypes.FETCH_COLLECTIONS_FAILURE, error)

export const fetchCollectionsAsync = () => async (dispatch) => {
  dispatch(fetchCollectionsStart())

  try {
    const collectionsResult = await getCollections()
    dispatch(fetchCollectionsSuccess(collectionsResult.data))
  } catch (error) {
    dispatch(fetchCollectionsFailure(error))
  }
}

export const fetchCollectionsShortInfoAsync = () => async (dispatch) => {
  try {
    const collectionsResult = await getCollectionsShortInfo()
    dispatch(fetchCollectionsSuccess(collectionsResult.data))
  } catch (error) {
    dispatch(fetchCollectionsFailure(error))
  }
}