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
  (productsSlice) => productsSlice.selectedProduct
)

export const selectIsLoading = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.isLoading
)

export const selectError = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.error
)