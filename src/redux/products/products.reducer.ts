import { AnyAction } from 'redux'

import { Product } from 'shared/types/products'

import { 
  addColorToProductFailed,
  addColorToProductSuccess,
  createProductFailed,
  createProductRequested,
  deleteColorFromProductFailed,
  deleteColorFromProductRequested,
  deleteColorFromProductSuccess,
  deleteProductFailed,
  deleteProductRequested,
  deleteProductSuccess,
  editProductColorDataSuccess,
  editProductFailed,
  editProductSuccess,
  fetchAllProductsFailed,
  fetchAllProductsRequested, 
  fetchAllProductsSuccess, 
  fetchProductFailed, 
  fetchProductForEditRequested, 
  fetchProductRequested, 
  fetchProductSuccess, 
  fetchSingleCollectionProductsFailed, 
  fetchSingleCollectionProductsRequested,
  fetchSingleCollectionProductsSuccess,
  removeOneImageFromColorImagesSuccess,
} from './products.actions'

export type ProductsState = {
  readonly allProducts: Product[]
  readonly singleCollectionProducts: Product[]
  readonly selectedProduct: Product
  readonly isLoading: boolean
  readonly error: Error | null
  readonly errorOnAddColor: Error | null
  readonly errorOnDeleteColor: Error | null
}

const INITIAL_STATE: ProductsState = {
  allProducts: [],
  singleCollectionProducts: [], 
  selectedProduct: {
    id: '',
    title: '',
    price: 0,
    stock: 0,
    mainImageUrl: '',
    collectionId: '',
    active: false,
    description: '',
    colors: []
  },
  isLoading: false,
  error: null,
  errorOnAddColor: null,
  errorOnDeleteColor: null
}

const productsReducer = (
  state = INITIAL_STATE, 
  action = {} as AnyAction
): ProductsState => {

  if (fetchSingleCollectionProductsRequested.match(action)) {
    return {
      ...state,
      isLoading: true,
      singleCollectionProducts: [],
      error: null
    }
  }

  if (
    fetchAllProductsRequested.match(action) ||
    fetchProductRequested.match(action) ||
    fetchProductForEditRequested.match(action) ||
    createProductRequested.match(action) ||
    deleteProductRequested.match(action) ||
    deleteColorFromProductRequested.match(action)
  ) {
    return {
      ...state,
      isLoading: true,
      error: null,
      errorOnAddColor: null,
      errorOnDeleteColor: null
    }
  }

  if (
    fetchAllProductsSuccess.match(action) ||
    deleteProductSuccess.match(action)
  ) {
    return {
      ...state,
      isLoading: false,
      allProducts: action.payload,
      error: null,
      errorOnAddColor: null,
      errorOnDeleteColor: null
    }
  }

  if (
    fetchSingleCollectionProductsSuccess.match(action) 
  ) {
    return {
      ...state,
      isLoading: false,
      singleCollectionProducts: action.payload,
      error: null
    }
  }
  
  if (
    fetchProductSuccess.match(action) ||
    editProductSuccess.match(action) ||
    addColorToProductSuccess.match(action) ||
    editProductColorDataSuccess.match(action) ||
    removeOneImageFromColorImagesSuccess.match(action) ||
    deleteColorFromProductSuccess.match(action)
    ) {
      return {
        ...state,
        isLoading: false,
        selectedProduct: action.payload,
        error: null
      }
    }
    
    if (
      fetchAllProductsFailed.match(action) ||
      fetchSingleCollectionProductsFailed.match(action) ||
      fetchProductFailed.match(action) ||
      createProductFailed.match(action) ||
      editProductFailed.match(action) ||
      deleteProductFailed.match(action)
    ) {
      return {
        ...state,
          isLoading: false,
          error: action.payload
      }
    }

    if (
      addColorToProductFailed.match(action)
    ) {
      return {
        ...state,
          isLoading: false,
          errorOnAddColor: action.payload
      }
    }

    if (
      deleteColorFromProductFailed.match(action)
    ) {
      return {
        ...state,
          isLoading: false,
          errorOnDeleteColor: action.payload
      }
    }

  return state

}

export default productsReducer