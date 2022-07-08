import ProductsActionTypes from './products.types'
import { createAction } from '../reducer.utils'
import { getCollectionProducts, getProducts, getSingleProduct, getSingleProductForEdit } from '../../rest-api/products'
import { fetchCollectionsSuccess } from '../collections/collections.actions'

export const fetchingStart = () => 
  createAction(ProductsActionTypes.FETCHING_START)

export const fetchingFailed = error => 
  createAction(ProductsActionTypes.FETCHING_FAILED, error)

export const fetchAllProductsSuccess = products =>
  createAction(ProductsActionTypes.FETCH_ALL_PRODUCTS_SUCCESS, products)

export const fetchCollectionProductsSuccess = products =>
  createAction(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS, products)

export const fetchProductSuccess = product =>
  createAction(ProductsActionTypes.FETCH_PRODUCT_SUCCESS, product)

export const fetchAllProductsAsync = () => async (dispatch) => {
  dispatch(fetchingStart())
  try {
    const productsResult = await getProducts()
    // console.log({productsResult})
    dispatch(fetchAllProductsSuccess(productsResult.data))
  } catch (error) {
    dispatch(fetchingFailed(error))
  }
}

export const fetchCollectionProductsAsync = collectionTitle => async (dispatch) => {
  dispatch(fetchingStart())
  try {
    const productsResult = await getCollectionProducts(collectionTitle)
    // console.log({productsResult})
    dispatch(fetchCollectionProductsSuccess(productsResult.data))
  } catch (error) {
    dispatch(fetchingFailed(error))
  }
}

export const fetchProductAsync = productId => async (dispatch) => {
  dispatch(fetchingStart())
  try {
    const productResult = await getSingleProduct(productId)
    dispatch(fetchProductSuccess(productResult.data))
  } catch (error) {
    dispatch(fetchingFailed(error))
  }
}

export const fetchProductForEditAsync = productId => async (dispatch) => {
  dispatch(fetchingStart())
  try {
    const responseResult = await getSingleProductForEdit(productId)
    dispatch(fetchProductSuccess(responseResult.data.product))
    dispatch(fetchCollectionsSuccess(responseResult.data.collections))
  } catch (error) {
    dispatch(fetchingFailed(error))
  }
}