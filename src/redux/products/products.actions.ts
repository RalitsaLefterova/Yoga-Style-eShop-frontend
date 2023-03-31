import ProductsActionTypes from './products.types'
import { createAction, Action, ActionWithPayload, withMatcher } from '../reducer.utils'
import { Product } from 'shared/types/products'
import { NavigateFunction } from 'react-router-dom'

// FETCH ALL PRODUCTS ('admin/products') //
export type FetchAllProductsRequested = Action<ProductsActionTypes.FETCH_ALL_PRODUCTS_REQUESTED>
export const fetchAllProductsRequested = withMatcher((): FetchAllProductsRequested => 
  createAction(ProductsActionTypes.FETCH_ALL_PRODUCTS_REQUESTED))

export type FetchAllProductsSuccess = ActionWithPayload<ProductsActionTypes.FETCH_ALL_PRODUCTS_SUCCESS, Product[]>
export const fetchAllProductsSuccess = withMatcher((products: Product[]): FetchAllProductsSuccess =>
  createAction(ProductsActionTypes.FETCH_ALL_PRODUCTS_SUCCESS, products))

export type FetchAllProductsFailed = ActionWithPayload<ProductsActionTypes.FETCH_ALL_PRODUCTS_FAILED, Error>
  export const fetchAllProductsFailed = withMatcher((error: Error): FetchAllProductsFailed => 
    createAction(ProductsActionTypes.FETCH_ALL_PRODUCTS_FAILED, error))
  
  
// FETCH SINGLE PRODUCT FOR EDIT ('admin/products/edit/:productId') //
export type FetchProductForEditRequested = ActionWithPayload<ProductsActionTypes.FETCH_PRODUCT_FOR_EDIT_REQUESTED, { productId: string }>
export const fetchProductForEditRequested = withMatcher((productId: string): FetchProductForEditRequested => 
  createAction(ProductsActionTypes.FETCH_PRODUCT_FOR_EDIT_REQUESTED, { productId }))

// FETCH SINGLE PRODUCT ('shop/:collectionTitle/:productId) //
export type FetchProductRequested = ActionWithPayload<ProductsActionTypes.FETCH_PRODUCT_REQUESTED, { productId: string }>
export const fetchProductRequested = withMatcher((productId: string): FetchProductRequested => 
  createAction(ProductsActionTypes.FETCH_PRODUCT_REQUESTED, { productId }))
  
// handle all success cases of fetching single product //
export type FetchProductSuccess = ActionWithPayload<ProductsActionTypes.FETCH_PRODUCT_SUCCESS, Product>
export const fetchProductSuccess = withMatcher((product: Product): FetchProductSuccess =>
  createAction(ProductsActionTypes.FETCH_PRODUCT_SUCCESS, product))

// handle all failed cases fetching single product //
export type FetchProductFailed = ActionWithPayload<ProductsActionTypes.FETCH_PRODUCT_FAILED, Error>
export const fetchProductFailed = withMatcher((error: Error): FetchProductFailed =>
  createAction(ProductsActionTypes.FETCH_PRODUCT_FAILED, error))


// FETCH ALL PRODUCTS OF A SINGLE COLLECTION ('shop/:collectionTitle') //
export type FetchSingleCollectionProductsRequested = ActionWithPayload<ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_REQUESTED, { collectionTitle: string }>
export const fetchSingleCollectionProductsRequested = withMatcher((collectionTitle: string): FetchSingleCollectionProductsRequested =>
  createAction(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_REQUESTED, { collectionTitle }))

export type FetchSingleCollectionProductsSuccess = ActionWithPayload<ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS, Product[]>
export const fetchSingleCollectionProductsSuccess = withMatcher((products: Product[]): FetchSingleCollectionProductsSuccess =>
  createAction(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS, products))

export type FetchSingleCollectionProductsFailed = ActionWithPayload<ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_FAILED, Error>
export const fetchSingleCollectionProductsFailed = withMatcher((error: Error): FetchSingleCollectionProductsFailed =>
  createAction(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_FAILED, error))


// CREATE PRODUCT //
export type CreateProductRequested = ActionWithPayload<ProductsActionTypes.CREATE_PRODUCT_REQUESTED, { data: FormData, navigate: NavigateFunction }>
export const createProductRequested = withMatcher((data: FormData, navigate: NavigateFunction): CreateProductRequested => 
  createAction(ProductsActionTypes.CREATE_PRODUCT_REQUESTED, { data, navigate }))

export type CreateProductSuccess = ActionWithPayload<ProductsActionTypes.CREATE_PRODUCT_SUCCESS, Product>
export const createProductSuccess = withMatcher((product: Product): CreateProductSuccess => 
  createAction(ProductsActionTypes.CREATE_PRODUCT_SUCCESS, product))

export type CreateProductFailed = ActionWithPayload<ProductsActionTypes.CREATE_PRODUCT_FAILED, Error>
export const createProductFailed = withMatcher((error: Error): CreateProductFailed =>
  createAction(ProductsActionTypes.CREATE_PRODUCT_FAILED, error))


// EDIT PRODUCT //
export type EditProductRequested = ActionWithPayload<ProductsActionTypes.EDIT_PRODUCT_REQUESTED, { productId: string, data: FormData, navigate: NavigateFunction }>
export const editProductRequested = withMatcher((productId: string, data: FormData, navigate: NavigateFunction): EditProductRequested =>
  createAction(ProductsActionTypes.EDIT_PRODUCT_REQUESTED, { productId, data, navigate }))

export type EditProductSuccess = ActionWithPayload<ProductsActionTypes.EDIT_PRODUCT_SUCCESS, Product>
export const editProductSuccess = withMatcher((product: Product): EditProductSuccess => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_SUCCESS, product))

export type EditProductFailed = ActionWithPayload<ProductsActionTypes.EDIT_PRODUCT_FAILED, Error>
export const editProductFailed = withMatcher((error: Error): EditProductFailed =>
  createAction(ProductsActionTypes.EDIT_PRODUCT_FAILED, error))


// ADD COLOR TO PRODUCT //
export type AddColorToProductRequested = ActionWithPayload<ProductsActionTypes.ADD_COLOR_TO_PRODUCT_REQUESTED, { productId: string , data: FormData }>
export const addColorToProductRequested = withMatcher((productId: string , data: FormData): AddColorToProductRequested => 
  createAction(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_REQUESTED, { productId, data }))

export type AddColorToProductSuccess = ActionWithPayload<ProductsActionTypes.ADD_COLOR_TO_PRODUCT_SUCCESS, Product>
export const addColorToProductSuccess = withMatcher((product: Product): AddColorToProductSuccess =>
  createAction(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_SUCCESS, product))

export type AddColorToProductFailed = ActionWithPayload<ProductsActionTypes.ADD_COLOR_TO_PRODUCT_FAILED, Error>
export const addColorToProductFailed = withMatcher((error: Error): AddColorToProductFailed =>
  createAction(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_FAILED, error))


// EDIT PRODUCT'S COLOR DATA //
export type EditProductColorDataRequested = ActionWithPayload<ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_REQUESTED, { productId: string, colorId: string , data: FormData }>
export const editProductColorDataRequested = withMatcher((productId: string, colorId: string , data: FormData): EditProductColorDataRequested => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_REQUESTED, { productId, colorId, data }))

export type EditProductColorDataSuccess = ActionWithPayload<ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_SUCCESS, Product>
export const editProductColorDataSuccess = withMatcher((product: Product): EditProductColorDataSuccess => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_SUCCESS, product))

export type EditProductColorDataFailed = ActionWithPayload<ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_FAILED, Error>
export const editProductColorDataFailed = withMatcher((error: Error): EditProductColorDataFailed =>
  createAction(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_FAILED, error))

  
// REMOVE ONE IMAGE FROM COLOR'S IMAGES //
export type RemoveOneImageFromColorImagesRequested = ActionWithPayload<ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_REQUESTED, { productId: string, colorId: string , data: FormData }>
export const removeOneImageFromColorImagesRequested = withMatcher((productId: string, colorId: string , data: FormData): RemoveOneImageFromColorImagesRequested => 
  createAction(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_REQUESTED, { productId, colorId, data }))

export type RemoveOneImageFromColorImagesSuccess = ActionWithPayload<ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_SUCCESS, Product>
export const removeOneImageFromColorImagesSuccess = withMatcher((product: Product): RemoveOneImageFromColorImagesSuccess => 
  createAction(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_SUCCESS, product))

export type RemoveOneImageFromColorImagesFailed = ActionWithPayload<ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_FAILED, Error>
export const removeOneImageFromColorImagesFailed = withMatcher((error: Error): RemoveOneImageFromColorImagesFailed =>
  createAction(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_FAILED, error))