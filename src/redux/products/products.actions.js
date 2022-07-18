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














