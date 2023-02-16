import ProductsActionTypes from './products.types'
import { createAction } from '../reducer.utils'

// 'admin/products'
export const fetchAllProductsRequested = () => 
  createAction(ProductsActionTypes.FETCH_ALL_PRODUCTS_REQUESTED)

export const fetchAllProductsSuccess = products =>
  createAction(ProductsActionTypes.FETCH_ALL_PRODUCTS_SUCCESS, products)


// 'admin/products/edit/:productId'
export const fetchProductForEditRequested = productId => 
  createAction(ProductsActionTypes.FETCH_PRODUCT_FOR_EDIT_REQUESTED, { productId })

// 'shop/:collectionTitle/:productId
export const fetchProductRequested = productId => 
  createAction(ProductsActionTypes.FETCH_PRODUCT_REQUESTED, { productId })
  
// handle all fetchings of single product
export const fetchProductSuccess = product =>
  createAction(ProductsActionTypes.FETCH_PRODUCT_SUCCESS, product)


// 'shop/:collectionTitle'
export const fetchSingleCollectionProductsRequested = collectionTitle =>
  createAction(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_REQUESTED, { collectionTitle })

export const fetchSingleCollectionProductsSuccess = products =>
  createAction(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS, products)


// handle all failed fetchings
export const fetchingFailed = error => 
  createAction(ProductsActionTypes.FETCHING_FAILED, error)



export const createProductRequested = (data, navigate) => 
  createAction(ProductsActionTypes.CREATE_PRODUCT_REQUESTED, { data, navigate })

export const createProductFailed = error => 
  createAction(ProductsActionTypes.CREATE_PRODUCT_FAILED, error)



export const editProductRequested = (productId, data, navigate) =>
  createAction(ProductsActionTypes.EDIT_PRODUCT_REQUESTED, { productId, data, navigate })

export const editProductSuccess = product => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_SUCCESS, product)

export const editProductFailed = error =>
  createAction(ProductsActionTypes.EDIT_PRODUCT_FAILED, error)


export const addColorToProductRequested = (productId, data) => 
  createAction(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_REQUESTED, { productId, data })

export const addColorToProductSuccess = product =>
  createAction(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_SUCCESS, product)

export const addColorToProductFailed = error => 
  createAction(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_FAILED, error)


export const editProductColorDataRequested = (productId, colorId, data) => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_REQUESTED, { productId, colorId, data })

export const editProductColorDataSuccess = product => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_SUCCESS, product)

export const editProductColorDataFailed = error => 
  createAction(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_FAILED, error)

  
// DELETE ONE IMAGE FROM COLOR IMAGES //
export const removeOneImageFromColorImagesRequested = (productId, colorId, data) => 
  createAction(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_REQUESTED, { productId, colorId, data })

export const removeOneImageFromColorImagesSuccess = product => 
  createAction(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_SUCCESS, product)

export const removeOneImageFromColorImagesFailed = error => 
  createAction(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_FAILED, error)