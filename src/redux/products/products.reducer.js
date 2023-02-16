import ProductsActionTypes from './products.types'

const INITIAL_STATE = {
  allProducts: [], //in admin only
  singleCollectionProducts: [], 
  selectedProduct: {},
  isLoading: false,
  error: null
}

const productsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action
  // console.log(' in products reducer', type, payload)
  switch (type) {

    case ProductsActionTypes.FETCH_ALL_PRODUCTS_REQUESTED:
    case ProductsActionTypes.FETCH_PRODUCT_FOR_EDIT_REQUESTED:
    case ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_REQUESTED:
    case ProductsActionTypes.CREATE_PRODUCT_REQUESTED:
      return {
        ...state,
        isLoading: true
      }

    case ProductsActionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allProducts: payload,
        error: null
      }

    case ProductsActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedProduct: payload,
        error: null
      }

    case ProductsActionTypes.FETCHING_FAILED:
    case ProductsActionTypes.CREATE_PRODUCT_FAILED:
    case ProductsActionTypes.ADD_COLOR_TO_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      }

    case ProductsActionTypes.EDIT_PRODUCT_SUCCESS:
    case ProductsActionTypes.ADD_COLOR_TO_PRODUCT_SUCCESS:
    case ProductsActionTypes.EDIT_PRODUCT_COLOR_DATA_SUCCESS:
    case ProductsActionTypes.REMOVE_ONE_IMAGE_FROM_COLOR_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedProduct: payload,
        error: null
      }
    
    case ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleCollectionProducts: payload,
        error: null
      }

    default:
      return state
  }
}

export default productsReducer