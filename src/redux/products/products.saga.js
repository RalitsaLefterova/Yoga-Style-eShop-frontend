import { takeLatest, put, all, call } from 'redux-saga/effects'

import ProductsActionTypes from './products.types'
import { 
  getProducts, 
  getSingleProductForEdit,
  getCollectionProducts,
  createProduct,
  editProduct,
  getSingleProduct
} from '../../rest-api/products'
import { 
  fetchAllProductsSuccess,
  fetchProductSuccess,
  fetchSingleCollectionProductsSuccess,
  fetchingFailed,
  createProductFailed,
  // editProductSuccess,
  editProductFailed
} from './products.actions'
import { 
  fetchCollectionsSuccess 
} from '../collections/collections.actions'

export function* fetchAllProductsAsync() {
  try {
    const productsResponse = yield call(getProducts)
    yield put(fetchAllProductsSuccess(productsResponse.data))
  } catch (error) {
    yield put(fetchingFailed(error))
  }
}

export function* onFetchAllProductsRequested() {
  yield takeLatest(ProductsActionTypes.FETCH_ALL_PRODUCTS_REQUESTED, fetchAllProductsAsync)
}

export function* fetchProductForEditAsync({ payload: { productId } }) {
  try {
    const response = yield call(getSingleProductForEdit, productId)
    const { product, collections } = response.data
    yield put(fetchProductSuccess(product))
    yield put(fetchCollectionsSuccess(collections))
  } catch (error) {
    yield put(fetchingFailed(error))
  }
}

export function* onFetchProductForEditRequested() {
  yield takeLatest(ProductsActionTypes.FETCH_PRODUCT_FOR_EDIT_REQUESTED, fetchProductForEditAsync)
}

export function* fetchProductAsync({ payload: { productId }}) {
  try {
    const response = yield call(getSingleProduct, productId)
    yield put(fetchProductSuccess(response.data))
  } catch (error) {
    yield put(fetchingFailed(error))
  }
}

export function* onFetchProductRequested() {
  yield takeLatest(ProductsActionTypes.FETCH_PRODUCT_REQUESTED, fetchProductAsync)
}

export function* fetchSingleCollectionProductsAsync({ payload: { collectionTitle } }) {
  try {
    const productsResponse = yield call(getCollectionProducts, collectionTitle)
    yield put(fetchSingleCollectionProductsSuccess(productsResponse.data))
  } catch (error) {
    yield put(fetchingFailed(error))
  }
}

export function* onFetchSingleCollectionProductsRequested() {
  yield takeLatest(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_REQUESTED, fetchSingleCollectionProductsAsync)
}

export function* editProductAsync({ payload: { productId, data, navigate }}) {
  try {
    const response = yield call(editProduct, productId, data)
    console.log('edited product info', response.data)
    navigate('/admin/products')
  } catch (error) {
    yield put(editProductFailed(error))
  }
}

export function* onEditProductRequested() {
  yield takeLatest(ProductsActionTypes.EDIT_PRODUCT_REQUESTED, editProductAsync)
}

export function* createProductAsync({ payload: { data, navigate }}) {
  try {
    const response = yield call(createProduct, data)
    console.log('create product responce: ', response)
    navigate('/admin/products')
  } catch (error) {
    yield put(createProductFailed(error))
  }
}

export function* onCreateProductRequested() {
  yield takeLatest(ProductsActionTypes.CREATE_PRODUCT_REQUESTED, createProductAsync)
}

export function* productsSaga() {
  yield all([
    call(onFetchAllProductsRequested),
    call(onFetchProductForEditRequested),
    call(onFetchProductRequested),
    call(onFetchSingleCollectionProductsRequested),
    call(onCreateProductRequested),
    call(onEditProductRequested)
  ])
}