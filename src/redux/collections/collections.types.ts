enum CollectionsActionTypes {
  FETCH_COLLECTIONS_REQUESTED = 'FETCH_COLLECTIONS_REQUESTED',
  FETCH_COLLECTIONS_SHORT_INFO_REQUESTED = 'FETCH_COLLECTIONS_SHORT_INFO_REQUESTED',
  FETCH_ACTIVE_COLLECTIONS_REQUESTED = 'FETCH_ACTIVE_COLLECTIONS_REQUESTED',
  FETCH_COLLECTIONS_SUCCESS = 'FETCH_COLLECTIONS_SUCCESS',
  FETCH_COLLECTIONS_FAILED = 'FETCH_COLLECTIONS_FAILED',

  FETCH_SINGLE_COLLECTION_REQUESTED = 'FETCH_SINGLE_COLLECTION_REQUESTED',
  FETCH_SINGLE_COLLECTION_SUCCESS = 'FETCH_SINGLE_COLLECTION_SUCCESS',
  FETCH_SINGLE_COLLECTION_FAILED = 'FETCH_SINGLE_COLLECTION_FAILED',

  CREATE_COLLECTION_REQUESTED = 'CREATE_COLLECTION_REQUESTED',
  CREATE_COLLECTION_SUCCESS = 'CREATE_COLLECTION_SUCCESS',
  CREATE_COLLECTION_FAILED = 'CREATE_COLLECTION_FAILED',

  EDIT_COLLECTION_REQUESTED = 'EDIT_COLLECTION_REQUESTED',
  EDIT_COLLECTION_SUCCESS = 'EDIT_COLLECTION_SUCCESS',
  EDIT_COLLECTION_FAILED = 'EDIT_COLLECTION_FAILED',

  EDIT_COLLECTION_POSITION_REQUESTED = 'EDIT_COLLECTION_POSITION_REQUESTED',
  EDIT_COLLECTION_POSITION_SUCCESS = 'EDIT_COLLECTION_POSITION_SUCCESS',
  EDIT_COLLECTION_POSITION_FAILED = 'EDIT_COLLECTION_POSITION_FAILED',

  DELETE_COLLECTION_REQUESTED = 'DELETE_COLLECTION_REQUESTED',
  DELETE_COLLECTION_SUCCESS = 'DELETE_COLLECTION_SUCCESS',
  DELETE_COLLECTION_FAILED = 'DELETE_COLLECTION_FAILED'
}

export default CollectionsActionTypes