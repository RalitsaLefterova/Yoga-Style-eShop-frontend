import { createSelector } from 'reselect'
import { RootState } from 'redux/root-reducer'
import { ProductsState } from './products.reducer'
import { Product } from 'shared/types/products'

const selectProductsReducer = (state: RootState): ProductsState => state.products

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

export const selectErrorOnAddColor = createSelector(
  [selectProductsReducer],
  (productsSlice) => productsSlice.errorOnAddColor
)