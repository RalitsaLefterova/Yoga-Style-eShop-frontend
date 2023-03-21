import { createSelector } from 'reselect'
import { RootState } from 'redux/root-reducer'
import { CollectionsState } from './collections.reducer'
import { Collection } from 'shared/types/collections'

const selectCollectionsReducer = (state: RootState): CollectionsState => state.collections

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
  (collections): Collection[] => 
    collections.reduce((acc, collection) => {
      const { _id, title } = collection
      acc.concat({ _id, title })
      return acc
    }, [] as Collection[])
)

export const selectSelectedCollection = createSelector(
  [selectCollectionsReducer],
  (collectionsSlice) => collectionsSlice.selectedCollection
)