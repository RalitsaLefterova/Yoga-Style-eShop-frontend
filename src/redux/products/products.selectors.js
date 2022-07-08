import { createSelector } from 'reselect'

const selectProductsReducer = state => state.products

export const selectAllProduct = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.allProducts
)

export const selectSingleCollectionProducts = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.singleCollectionProducts
)

export const selectProduct = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.product
)

export const selectIsLoading = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.isLoading
)