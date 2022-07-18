import { takeLatest, all, call, put } from 'redux-saga/effects'

import CollectionsActionTypes from './collections.types'
import { 
  getCollections, 
  getCollectionsShortInfo 
} from '../../rest-api/collections'
import { 
  fetchCollectionsSuccess, 
  fetchCollectionsFailure 
} from './collections.actions'


export function* fetchCollectionsAsync() {
  try {
    const collectionsResponse = yield call(getCollections)
    yield put(fetchCollectionsSuccess(collectionsResponse.data))
  } catch (error) {
    yield put(fetchCollectionsFailure(error))
  }
}

export function* onFetchCollections() {
  // in 'take' we received actions; 'takeLatest' - give me the latest one
  yield takeLatest(CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED, fetchCollectionsAsync)

}

export function* fetchCollectionsShortInfoAsync() {
  try {
    const collectionsResponse = yield call(getCollectionsShortInfo)
    yield put(fetchCollectionsSuccess(collectionsResponse.data))
  } catch (error) {
    yield put(fetchCollectionsFailure(error))
  }
}

export function* onFetchCollectionsShortInfoRequested() {
  yield takeLatest(CollectionsActionTypes.FETCH_COLLECTIONS_SHORT_INFO_REQUESTED, fetchCollectionsShortInfoAsync)
}

export function* collectionsSaga() {
  // 'all' is an effect that says: run everything inside 
  // and only complete when all of it is done
  yield all([
    call(onFetchCollections),
    call(onFetchCollectionsShortInfoRequested)
  ])
}