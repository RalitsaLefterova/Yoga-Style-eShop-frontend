import { createSelector } from 'reselect'

const selectCollectionsReducer = state => state.collections

export const selectCollections = createSelector(
  [selectCollectionsReducer],
  (collectionsSlice) => collectionsSlice.collectionsList
)

export const selectIsLoadingCollections = createSelector(
  [selectCollectionsReducer],
  (collectionsSlice) => collectionsSlice.isLoading
)

export const selectCollectionsShortInfo = createSelector(
  [selectCollections],
  collections => collections.reduce(
    (shortCollectionsInfo, collection) => 
      shortCollectionsInfo.concat({ _id: collection._id, title: collection.title }),
    []
  )
)