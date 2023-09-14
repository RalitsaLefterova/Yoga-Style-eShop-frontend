import { takeLatest, put, all, call } from 'typed-redux-saga'

import ProductsActionTypes from './products.types'
import { 
  getProducts, 
  getSingleProductForEdit,
  getCollectionProducts,
  createProduct,
  editProduct,
  getSingleProduct,
  addColorToProduct,
  editProductColorData,
  removeImageFromColorImages,
  deleteColorFromProduct,
  deleteProduct
} from '../../rest-api/products'
import { 
  fetchAllProductsSuccess,
  fetchProductSuccess,
  fetchSingleCollectionProductsSuccess,
  createProductFailed,
  editProductSuccess,
  editProductFailed,
  addColorToProductSuccess,
  addColorToProductFailed,
  editProductColorDataSuccess,
  editProductColorDataFailed,
  removeOneImageFromColorImagesFailed,
  removeOneImageFromColorImagesSuccess,
  CreateProductRequested,
  fetchAllProductsFailed,
  FetchProductForEditRequested,
  fetchProductFailed,
  FetchProductRequested,
  FetchSingleCollectionProductsRequested,
  fetchSingleCollectionProductsFailed,
  EditProductRequested,
  AddColorToProductRequested,
  EditProductColorDataRequested,
  RemoveOneImageFromColorImagesRequested,
  DeleteColorFromProductRequested,
  deleteColorFromProductFailed,
  deleteColorFromProductSuccess,
  DeleteProductRequested,
  deleteProductSuccess,
  deleteProductFailed
} from './products.actions'
import { 
  fetchCollectionsSuccess,
  fetchSingleCollectionSuccess 
} from '../collections/collections.actions'
import { AxiosError } from 'axios'
import { handleRequestError } from 'components/request-error-handler/request-error-handler.component'
import { ErrorResponse } from 'shared/interfaces/error-response'


// CREATE PRODUCT //
export function* createProductAsync({ payload: { data, navigate }}: CreateProductRequested) {
  try {
    const response = yield* call(createProduct, data)
    console.log('create product responce: ', response)
    navigate('/admin/products')
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(createProductFailed(apiError))
  }
}
export function* onCreateProductRequested() {
  yield* takeLatest(ProductsActionTypes.CREATE_PRODUCT_REQUESTED, createProductAsync)
}

// FETCH ALL PRODUCTS //
export function* fetchAllProductsAsync() {
  try {
    const productsResponse = yield* call(getProducts)
    yield* put(fetchAllProductsSuccess(productsResponse.data))
  } catch (error) {
    yield* put(fetchAllProductsFailed(error as Error))
  }
}
export function* onFetchAllProductsRequested() {
  yield* takeLatest(ProductsActionTypes.FETCH_ALL_PRODUCTS_REQUESTED, fetchAllProductsAsync)
}

// FETCH PRODUCT FOR EDIT //
export function* fetchProductForEditAsync({ payload: { productId } }: FetchProductForEditRequested) {
  try {
    const response = yield* call(getSingleProductForEdit, productId)
    const { product, collections } = response.data
    console.log('in saga', {product}, {collections})
    yield* put(fetchProductSuccess(product))
    yield* put(fetchCollectionsSuccess(collections))
  } catch (error) {
    yield* put(fetchProductFailed(error as Error))
  }
}
export function* onFetchProductForEditRequested() {
  yield* takeLatest(ProductsActionTypes.FETCH_PRODUCT_FOR_EDIT_REQUESTED, fetchProductForEditAsync)
}

// FETCH PRODUCT //
export function* fetchProductAsync({ payload: { productId }}: FetchProductRequested) {
  console.log('in saga')
  try {
    const response = yield* call(getSingleProduct, productId)
    yield* put(fetchProductSuccess(response.data))
  } catch (error) {
    yield* put(fetchProductFailed(error as Error))
  }
}
export function* onFetchProductRequested() {
  yield* takeLatest(ProductsActionTypes.FETCH_PRODUCT_REQUESTED, fetchProductAsync)
}

// FETCH ALL PRODUCTS OF A SINGLE COLLECTION //
export function* fetchSingleCollectionProductsAsync({ payload: { collectionTitle } }: FetchSingleCollectionProductsRequested) {
  try {
    const productsResponse = yield* call(getCollectionProducts, collectionTitle)
    console.log({productsResponse})
    const products = productsResponse.data.products
    const collection = productsResponse.data.collection
    yield* put(fetchSingleCollectionProductsSuccess(products))
    yield* put(fetchSingleCollectionSuccess(collection))
  } catch (error) {
    yield* put(fetchSingleCollectionProductsFailed(error as Error))
  }
}
export function* onFetchSingleCollectionProductsRequested() {
  yield* takeLatest(ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_REQUESTED, fetchSingleCollectionProductsAsync)
}

// EDIT PRODUCT //
export function* editProductAsync({ payload: { productId, data, navigate }}: EditProductRequested) {
  try {
    const response = yield* call(editProduct, productId, data)
    console.log('edited product info', response.data)
    yield* put(editProductSuccess(response.data))
    navigate('/admin/products')
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(editProductFailed(apiError))
  }
}
export function* onEditProductRequested() {
  yield* takeLatest(ProductsActionTypes.EDIT_PRODUCT_REQUESTED, editProductAsync)
}

// DELETE PRODUCT //
export function* deleteProductAsync({ payload: { productId }}: DeleteProductRequested) {
  try {
    const response = yield* call(deleteProduct, productId)
    console.log('delete product response', response.data)
    yield* put(deleteProductSuccess(response.data))
  } catch (error) {
    yield* put(deleteProductFailed(error as Error))
  }
}
export function* onDeleteProductRequested() {
  yield* takeLatest(ProductsActionTypes.DELETE_PRODUCT_REQUESTED, deleteProductAsync)
}

// ADD COLOR TO PRODUCT //
export function* addColorToProductAsync({ payload: { productId, data }}: AddColorToProductRequested) {
  try {
    const response = yield* call(addColorToProduct, productId, data)
    if (response.data) {
      yield* put(addColorToProductSuccess(response.data))
    }
    if (response instanceof AxiosError) {
      throw new Error(response.response?.data)
    }
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(addColorToProductFailed(apiError))
  }
}
export function* onAddColorToProductRequested() {
  yield* takeLatest(ProductsActionTypes.ADD_COLOR_TO_PRODUCT_REQUESTED, addColorToProductAsync)
}

// EDIT PRODUCT'S COLOR DATA //
export function* editProductColorDataAsync({ payload: { productId, colorId, data }}: EditProductColorDataRequested) {
  // console.log('in saga editProductColorDataAsync', {productId, colorId, data})
  try {
    const response = yield* call(editProductColorData, productId, colorId, data)
    if (response.data) {
      yield* put(editProductColorDataSuccess(response.data))
    }
    if (response instanceof AxiosError) {
      throw new Error(response.response?.data)
    }
  } catch (error) {
    yield* put(editProductColorDataFailed(error as Error))
  }
}
export function* onEditProductColorDataRequested() {
  yield* takeLatest(ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_REQUESTED, editProductColorDataAsync)
}

// REMOVE ONE IMAGE FROM COLOR'S IMAGES //
export function* removeOneImageFromColorImagesAsync({ payload: { productId, colorId, data }}: RemoveOneImageFromColorImagesRequested) {
  console.log('in saga removeOneImageFromColorImagesAsync', {productId, colorId, data})
  try {
    const response = yield* call(removeImageFromColorImages, productId, colorId, data)
    if (response.data) {
      yield* put(removeOneImageFromColorImagesSuccess(response.data))
    }
    if (response instanceof AxiosError) {
      throw new Error(response.response?.data)
    }
  } catch (error: unknown) {
    yield* put(removeOneImageFromColorImagesFailed(error as Error))
  }
}
export function* onRemoveOneImageFromColorImagesRequested() {
  yield* takeLatest(ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_REQUESTED, removeOneImageFromColorImagesAsync)
}

// DELETE COLOR FROM PRODUCT //
export function* deleteColorFromProductAsync({ payload: { productId, colorId }}: DeleteColorFromProductRequested) {
  try {
    const response = yield* call(deleteColorFromProduct, productId, colorId)
    if (response.data) {
      yield* put(deleteColorFromProductSuccess(response.data))
    }
  } catch (error) {
    yield* put(deleteColorFromProductFailed(error as Error))
  }
}
export function* onDeleteColorFromProductRequested() {
  yield* takeLatest(ProductsActionTypes.DELETE_COLOR_FROM_PRODUCT_REQUESTED, deleteColorFromProductAsync)
}

export function* productsSaga() {
  yield* all([
    call(onFetchAllProductsRequested),
    call(onFetchProductForEditRequested),
    call(onFetchProductRequested),
    call(onFetchSingleCollectionProductsRequested),
    call(onCreateProductRequested),
    call(onEditProductRequested),
    call(onDeleteProductRequested),
    call(onAddColorToProductRequested),
    call(onEditProductColorDataRequested),
    call(onRemoveOneImageFromColorImagesRequested),
    call(onDeleteColorFromProductRequested)
  ])
}