import { takeLatest, all, call, put } from 'typed-redux-saga'
import axios, { AxiosError } from 'axios'

import CollectionsActionTypes from './collections.types'
import { 
  createCollection,
  deleteCollection,
  editCollection,
  editCollectionPosition,
  getCollections, 
  getCollectionsShortInfo,
  getActiveCollections,
  getSingleCollection
} from '../../rest-api/collections'
import { 
  FetchSingleCollectionRequested,
  fetchCollectionsSuccess, 
  fetchCollectionsFailed,
  fetchSingleCollectionSuccess,
  fetchSingleCollectionFailed,
  createCollectionRequested,
  CreateCollectionRequested,
  createCollectionSuccess,
  createCollectionFailed,
  EditCollectionRequested,
  editCollectionSuccess,
  editCollectionFailed,
  DeleteCollectionRequested,
  deleteCollectionSuccess,
  deleteCollectionFailed,
  EditCollectionPositionRequested,
  editCollectionPositionSuccess,
  editCollectionPositionFailed
} from './collections.actions'
import { Collection } from 'shared/types/collections'
import { ErrorResponse } from 'shared/interfaces/error-response'
import { handleRequestError } from 'components/request-error-handler/request-error-handler.component'

// CREATE COLLECTION 
export function* createCollectionRequestedAsync({ payload: { data, navigate }}: CreateCollectionRequested) {
  try {
    const createCollectionResponse = yield* call(createCollection, data)
    yield* put(createCollectionSuccess(createCollectionResponse.data))
    navigate('/admin/collections')  
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(createCollectionFailed(apiError))
  }
}
export function* onCreateCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.CREATE_COLLECTION_REQUESTED, createCollectionRequestedAsync)
}

// EDIT COLLECTION
export function* editCollectionRequestedAsync({ payload: { collectionId, data, navigate }}: EditCollectionRequested) {
  try {
    const editCollectionResponse = yield* call(editCollection, collectionId, data)
    if (editCollectionResponse.data) {
      yield* put(editCollectionSuccess(editCollectionResponse.data))
    }
    navigate('/admin/collections')
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(editCollectionFailed(apiError))
  }
}
export function* onEditCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.EDIT_COLLECTION_REQUESTED, editCollectionRequestedAsync)
}

// EDIT COLLECTION POSITION
export function* editCollectionPositionRequestedAsync({ payload: { collectionId, position }}: EditCollectionPositionRequested) {
  try {
    const editCollectionPositionResponse = yield* call(editCollectionPosition, collectionId, position)
    console.log({editCollectionPositionResponse})
    if (editCollectionPositionResponse.data) {
      yield* put(editCollectionPositionSuccess(editCollectionPositionResponse.data))
    }
  } catch (error) {
    yield* put(editCollectionPositionFailed(error as Error))
  }
}
export function* onEditCollectionPositionRequested() {
  yield* takeLatest(CollectionsActionTypes.EDIT_COLLECTION_POSITION_REQUESTED, editCollectionPositionRequestedAsync)
}

// DELETE COLLECTION
export function* deleteCollectionRequestedAsync({ payload: { collectionId }}: DeleteCollectionRequested) {
  try {
    const deleteCollectionResponse = yield* call(deleteCollection, collectionId)
    yield* put(deleteCollectionSuccess(deleteCollectionResponse.data))
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(deleteCollectionFailed(apiError))
  }
}
export function* onDeleteCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.DELETE_COLLECTION_REQUESTED, deleteCollectionRequestedAsync)
}

// FETCH SINGLE COLLECTION
export function* fetchSingleCollectionRequestedAsync({ payload: { collectionId } }: FetchSingleCollectionRequested) {
  try {
    const singleCollectionResponse = yield* call(getSingleCollection, collectionId)
    if (axios.isAxiosError(singleCollectionResponse)) {
      const errorMessage = singleCollectionResponse.response ? singleCollectionResponse.response.data : 'Problem occurred when fetching single collection data.'
      throw new Error(errorMessage as string)
    }
    yield* put(fetchSingleCollectionSuccess(singleCollectionResponse.data))
  } catch (error) {
    yield* put(fetchSingleCollectionFailed(error as Error))
  }
}
export function* onFetchSingleCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.FETCH_SINGLE_COLLECTION_REQUESTED, fetchSingleCollectionRequestedAsync)
} 

// FETCH COLLECTIONS
export function* fetchCollectionsRequestedAsync() {
  try {
    const collectionsResponse = yield* call(getCollections)
    yield* put(fetchCollectionsSuccess(collectionsResponse.data))
  } catch (error) {
    yield* put(fetchCollectionsFailed(error as Error))
  }
}
export function* onFetchCollectionsRequested() {
  // in 'take' we received actions; 'takeLatest' - give me the latest one
  yield* takeLatest(CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED, fetchCollectionsRequestedAsync)
}

// FETCH COLLECTIONS SHORT INFO
export function* fetchCollectionsShortInfoAsync() {
  try {
    const collectionsResponse = yield* call(getCollectionsShortInfo)
    yield* put(fetchCollectionsSuccess(collectionsResponse.data))
  } catch (error) {
    yield* put(fetchCollectionsFailed(error as Error))
  }
}
export function* onFetchCollectionsShortInfoRequested() {
  yield* takeLatest(CollectionsActionTypes.FETCH_COLLECTIONS_SHORT_INFO_REQUESTED, fetchCollectionsShortInfoAsync)
}

// FETCH ACTIVE COLLECTIONS
export function* fetchActiveCollectionsRequestedAsync() {
  try {
    const collectionsResponse = yield* call(getActiveCollections)
    yield* put(fetchCollectionsSuccess(collectionsResponse.data))
  } catch (error) {
    yield* put(fetchCollectionsFailed(error as Error))
  }
}
export function* onFetchActiveCollectionsRequested() {
  console.log('')
  yield* takeLatest(CollectionsActionTypes.FETCH_ACTIVE_COLLECTIONS_REQUESTED, fetchActiveCollectionsRequestedAsync)
}

export function* collectionsSaga() {
  // 'all' is an effect that says: run everything inside and only complete when all of it is done
  yield* all([
    call(onFetchCollectionsRequested),
    call(onFetchCollectionsShortInfoRequested),
    call(onFetchActiveCollectionsRequested),
    call(onFetchSingleCollectionRequested),
    call(onCreateCollectionRequested),
    call(onEditCollectionRequested),
    call(onEditCollectionPositionRequested),
    call(onDeleteCollectionRequested)
  ])
}