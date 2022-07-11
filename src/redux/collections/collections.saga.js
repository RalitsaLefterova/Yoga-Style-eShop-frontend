import { takeLatest, all, call, put } from 'redux-saga/effects'

import { getCollections } from '../../rest-api/collections'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './collections.actions'
import CollectionsActionTypes from './collections.types'

export function* fetchCollectionsAsync() {
  try {
    const collectionsResult = yield call(getCollections)
    yield put(fetchCollectionsSuccess(collectionsResult.data))
  } catch (error) {
    yield put(fetchCollectionsFailure(error))
  }
}

export function* onFetchCollections() {
  // in 'take' we received actions; 'takeLatest' - give me the latest one
  yield takeLatest(CollectionsActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)

}

export function* collectionsSaga() {
  // 'all' is an effect that says: run everything inside 
  // and only complete when all of it is done
  yield all([
    call(onFetchCollections)
  ])
}