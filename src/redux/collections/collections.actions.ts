import CollectionsActionTypes from './collections.types'
import { createAction, Action, ActionWithPayload, withMatcher } from '../reducer.utils'
import { Collection } from '../../shared/types/collections'
import { NavigateFunction } from 'react-router-dom'


// FETCH ALL COLLECTIONS //
export type FetchCollectionsRequested = Action<CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED>
export const fetchCollectionsRequested = withMatcher((): FetchCollectionsRequested =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_REQUESTED))

export type FetchCollectionsShortInfoRequested = Action<CollectionsActionTypes.FETCH_COLLECTIONS_SHORT_INFO_REQUESTED>
export const fetchCollectionsShortInfoRequested = withMatcher((): FetchCollectionsShortInfoRequested =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_SHORT_INFO_REQUESTED))

export type FetchActiveCollectionsRequested = Action<CollectionsActionTypes.FETCH_ACTIVE_COLLECTIONS_REQUESTED>
export const fetchActiveCollectionsRequested = withMatcher((): FetchActiveCollectionsRequested =>
  createAction(CollectionsActionTypes.FETCH_ACTIVE_COLLECTIONS_REQUESTED))

export type FetchCollectionsSuccess = ActionWithPayload<CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS, Collection[]>
export const fetchCollectionsSuccess = withMatcher((collections: Collection[]): FetchCollectionsSuccess =>
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS, collections))

export type FetchCollectionsFailed = ActionWithPayload<CollectionsActionTypes.FETCH_COLLECTIONS_FAILED, Error>
export const fetchCollectionsFailed = withMatcher((error: Error): FetchCollectionsFailed => 
  createAction(CollectionsActionTypes.FETCH_COLLECTIONS_FAILED, error))


// FETCH SINGLE COLLECTION //
export type FetchSingleCollectionRequested = ActionWithPayload<CollectionsActionTypes.FETCH_SINGLE_COLLECTION_REQUESTED, { collectionId: string }>
export const fetchSingleCollectionRequested = withMatcher((collectionId: string): FetchSingleCollectionRequested => 
  createAction(CollectionsActionTypes.FETCH_SINGLE_COLLECTION_REQUESTED, { collectionId }))

export type FetchSingleCollectionSuccess = ActionWithPayload<CollectionsActionTypes.FETCH_SINGLE_COLLECTION_SUCCESS, Collection>
export const fetchSingleCollectionSuccess = withMatcher((collection: Collection): FetchSingleCollectionSuccess =>
  createAction(CollectionsActionTypes.FETCH_SINGLE_COLLECTION_SUCCESS, collection))

export type FetchSingleCollectionFailed = ActionWithPayload<CollectionsActionTypes.FETCH_SINGLE_COLLECTION_FAILED, Error>
export const fetchSingleCollectionFailed = withMatcher((error: Error): FetchSingleCollectionFailed => 
  createAction(CollectionsActionTypes.FETCH_SINGLE_COLLECTION_FAILED, error))


// CREATE COLLECTION //
export type CreateCollectionRequested = ActionWithPayload<CollectionsActionTypes.CREATE_COLLECTION_REQUESTED, { data: FormData, navigate: NavigateFunction }>
export const createCollectionRequested = withMatcher((data: FormData, navigate: NavigateFunction ): CreateCollectionRequested => 
  createAction(CollectionsActionTypes.CREATE_COLLECTION_REQUESTED, { data, navigate }))

export type CreateCollectionSuccess = ActionWithPayload<CollectionsActionTypes.CREATE_COLLECTION_SUCCESS, Collection>
export const createCollectionSuccess = withMatcher((collection: Collection): CreateCollectionSuccess => 
  createAction(CollectionsActionTypes.CREATE_COLLECTION_SUCCESS, collection))

export type CreateCollectionFailed = ActionWithPayload<CollectionsActionTypes.CREATE_COLLECTION_FAILED, Error>
export const createCollectionFailed = withMatcher((error: Error): CreateCollectionFailed => 
  createAction(CollectionsActionTypes.CREATE_COLLECTION_FAILED, error))


// EDIT COLLECTION //
export type EditCollectionRequested = ActionWithPayload<CollectionsActionTypes.EDIT_COLLECTION_REQUESTED, { collectionId: string, data: FormData, navigate: NavigateFunction }>
export const editCollectionRequested = withMatcher((collectionId: string, data: FormData, navigate: NavigateFunction ): EditCollectionRequested =>
  createAction(CollectionsActionTypes.EDIT_COLLECTION_REQUESTED, { collectionId, data, navigate }))

export type EditCollectionSuccess = ActionWithPayload<CollectionsActionTypes.EDIT_COLLECTION_SUCCESS, Collection>
export const editCollectionSuccess = withMatcher((collection: Collection): EditCollectionSuccess =>
  createAction(CollectionsActionTypes.EDIT_COLLECTION_SUCCESS, collection))

export type EditCollectionFailed = ActionWithPayload<CollectionsActionTypes.EDIT_COLLECTION_FAILED, Error>
export const editCollectionFailed = withMatcher((error: Error): EditCollectionFailed =>
  createAction(CollectionsActionTypes.EDIT_COLLECTION_FAILED, error))


// EDIT COLLECTION POSITION //
export type EditCollectionPositionRequested = ActionWithPayload<CollectionsActionTypes.EDIT_COLLECTION_POSITION_REQUESTED, { collectionId: string, position: number }>
export const editCollectionPositionRequested = withMatcher((collectionId: string, position: number ): EditCollectionPositionRequested =>
  createAction(CollectionsActionTypes.EDIT_COLLECTION_POSITION_REQUESTED, { collectionId, position }))

export type EditCollectionPositionSuccess = ActionWithPayload<CollectionsActionTypes.EDIT_COLLECTION_POSITION_SUCCESS, Collection[]>
export const editCollectionPositionSuccess = withMatcher((collections: Collection[]): EditCollectionPositionSuccess =>
  createAction(CollectionsActionTypes.EDIT_COLLECTION_POSITION_SUCCESS, collections))

export type EditCollectionPositionFailed = ActionWithPayload<CollectionsActionTypes.EDIT_COLLECTION_POSITION_FAILED, Error>
export const editCollectionPositionFailed = withMatcher((error: Error): EditCollectionPositionFailed =>
  createAction(CollectionsActionTypes.EDIT_COLLECTION_POSITION_FAILED, error))


// DELETE COLLECTION //
export type DeleteCollectionRequested = ActionWithPayload<CollectionsActionTypes.DELETE_COLLECTION_REQUESTED, { collectionId: string }>
export const deleteCollectionRequested = withMatcher((collectionId: string): DeleteCollectionRequested =>
  createAction(CollectionsActionTypes.DELETE_COLLECTION_REQUESTED, { collectionId }))

export type DeleteCollectionSuccess = ActionWithPayload<CollectionsActionTypes.DELETE_COLLECTION_SUCCESS, Collection[]>
export const deleteCollectionSuccess = withMatcher((collections: Collection[]): DeleteCollectionSuccess =>
  createAction(CollectionsActionTypes.DELETE_COLLECTION_SUCCESS, collections))

export type DeleteCollectionFailed = ActionWithPayload<CollectionsActionTypes.DELETE_COLLECTION_FAILED, Error>
export const deleteCollectionFailed = withMatcher((error: Error): DeleteCollectionFailed =>
  createAction(CollectionsActionTypes.DELETE_COLLECTION_FAILED, error))