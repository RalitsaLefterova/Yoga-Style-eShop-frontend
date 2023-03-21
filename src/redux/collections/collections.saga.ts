import { takeLatest, all, call, put } from 'typed-redux-saga'
import axios from 'axios'

import CollectionsActionTypes from './collections.types'
import { 
  createCollection,
  deleteCollection,
  editCollection,
  editCollectionPosition,
  getCollections, 
  getCollectionsShortInfo,
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

// CREATE COLLECTION 
export function* createCollectionRequestedAsync({ payload: { data, navigate }}: CreateCollectionRequested) {
  console.log('createCollectionRequestedAsync', {data})
  try {
    const createCollectionResponse = yield* call(createCollection, data)
    console.log({createCollectionResponse})
    yield* put(createCollectionSuccess(createCollectionResponse.data))
    navigate('/admin/collections')
  } catch (error) {
    yield* put(createCollectionFailed(error as Error))
  }
}
export function* onCreateCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.CREATE_COLLECTION_REQUESTED, createCollectionRequestedAsync)
}

// EDIT COLLECTION
export function* editCollectionRequestedAsync({ payload: { collectionId, data, navigate }}: EditCollectionRequested) {
  console.log('editCollectionRequestedAsync', {collectionId}, {data})
  try {
    const editCollectionResponse = yield* call(editCollection, collectionId, data)
    console.log({editCollectionResponse})
    if (editCollectionResponse.data) {
      yield* put(editCollectionSuccess(editCollectionResponse.data))
    }
    navigate('/admin/collections')
  } catch (error) {
    yield* put(editCollectionFailed(error as Error))
  }
}
export function* onEditCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.EDIT_COLLECTION_REQUESTED, editCollectionRequestedAsync)
}

// EDIT COLLECTION POSITION
export function* editCollectionPositionRequestedAsync({ payload: { collectionId, position }}: EditCollectionPositionRequested) {
  console.log('editCollectionRequestedAsync', {collectionId}, {position})
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
  console.log('deleteCollectionRequestedAsync', {collectionId})
  try {
    const deleteCollectionResponse = yield* call(deleteCollection, collectionId)
    console.log({deleteCollectionResponse})
    yield* put(deleteCollectionSuccess(deleteCollectionResponse.data))
  } catch (error) {
    yield* put(deleteCollectionFailed(error as Error))
  }
}
export function* onDeleteCollectionRequested() {
  yield* takeLatest(CollectionsActionTypes.DELETE_COLLECTION_REQUESTED, deleteCollectionRequestedAsync)
}

// FETCH SINGLE COLLECTION
export function* fetchSingleCollectionRequestedAsync({ payload: { collectionId } }: FetchSingleCollectionRequested) {
  console.log('in saga fetchSingleCollectionRequestedAsync', collectionId)
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

export function* collectionsSaga() {
  // 'all' is an effect that says: run everything inside and only complete when all of it is done
  yield* all([
    call(onFetchCollectionsRequested),
    call(onFetchCollectionsShortInfoRequested),
    call(onFetchSingleCollectionRequested),
    call(onCreateCollectionRequested),
    call(onEditCollectionRequested),
    call(onEditCollectionPositionRequested),
    call(onDeleteCollectionRequested)
  ])
}