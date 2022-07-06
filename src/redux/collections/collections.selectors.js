import { createSelector } from 'reselect'

const selectCollectionsReducer = state => state.collections

export const selectCollections = createSelector(
  [selectCollectionsReducer],
  (collectionsSlice) => collectionsSlice.collectionsList
)