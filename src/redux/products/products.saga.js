import { takeLatest, put, all, call } from 'redux-saga/effects'

import ProductsActionTypes from './products.types'
import { 
  getProducts, 
  getSingleProductForEdit,
  getCollectionProducts,
  createProduct,
  editProduct,
  getSingleProduct,
  addAdditionalImageToProduct,
  addColorToProduct,
  editProductColorData,
  removeImageFromColorImages
} from '../../rest-api/products'
import { 
  fetchAllProductsSuccess,
  fetchProductSuccess,
  fetchSingleCollectionProductsSuccess,
  fetchingFailed,
  createProductFailed,
  // editProductSuccess,
  editProductFailed,
  addAdditionalImageToProductSuccess,
  addAdditionalImageToProductFailed,
  addColorToProductSuccess,
  addColorToProductFailed,
  editProductColorDataSuccess,
  editProductColorDataFailed,
  removeOneImageFromColorImagesFailed,
  removeOneImageFromColorImagesSuccess
} from './products.actions'
import { 
  fetchCollectionsSuccess 
} from '../collections/collections.actions'
import { AxiosError } from 'axios'


// CREATE PRODUCT //
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

export function* addColorToProductAsync({ payload: { productId, data }}) {
  
  try {
    console.log('in saga', productId, data)
    const response = yield call(addColorToProduct, productId, data)
    if (response.data) {
      yield put(addColorToProductSuccess(response.data))
    }
    if (response instanceof AxiosError) {
      throw new Error(response.response.data)
    }
  } catch (error) {
    console.log('in saga error:', error)
    yield put(addColorToProductFailed(error.message))
  }
}

export function* onAddColorToProductRequested() {
  yield takeLatest(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_REQUESTED, addColorToProductAsync)
}

export function* editProductColorDataAsync({ payload: { productId, colorId, data }}) {
  console.log('in saga editProductColorDataAsync', {productId, colorId, data})
  try {
    const response = yield call(editProductColorData, productId, colorId, data)
    if (response.data) {
      yield put(editProductColorDataSuccess(response.data))
    }
    if (response instanceof AxiosError) {
      throw new Error(response.response.data)
    }
  } catch (error) {
    yield put(editProductColorDataFailed(error.message))
  }
}

export function* onEditProductColorDataRequested() {
  yield takeLatest(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_REQUESTED, editProductColorDataAsync)
}

// REMOVE ONE IMAGE FROM COLOR IMAGES //
export function* removeOneImageFromColorImagesAsync({ payload: { productId, colorId, data }}) {
  console.log('in saga removeOneImageFromColorImagesAsync', {productId, colorId, data})
  try {
    const response = yield call(removeImageFromColorImages, productId, colorId, data)
    if (response.data) {
      yield put(removeOneImageFromColorImagesSuccess(response.data))
    }
    if (response instanceof AxiosError) {
      throw new Error(response.response.data)
    }
  } catch (error) {
    yield put(removeOneImageFromColorImagesFailed(error.message))
  }
}

export function* onRemoveOneImageFromColorImagesRequested() {
  yield takeLatest(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_REQUESTED, removeOneImageFromColorImagesAsync)
}

export function* productsSaga() {
  yield all([
    call(onFetchAllProductsRequested),
    call(onFetchProductForEditRequested),
    call(onFetchProductRequested),
    call(onFetchSingleCollectionProductsRequested),
    call(onCreateProductRequested),
    call(onEditProductRequested),
    call(onAddColorToProductRequested),
    call(onEditProductColorDataRequested),
    call(onRemoveOneImageFromColorImagesRequested)
  ])
}