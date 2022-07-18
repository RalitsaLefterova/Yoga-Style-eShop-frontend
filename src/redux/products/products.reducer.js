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
        allProducts: payload
      }

    case ProductsActionTypes.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedProduct: payload
      }

    case ProductsActionTypes.FETCHING_FAILED:
    case ProductsActionTypes.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      }

    case ProductsActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedProduct: payload
      }
    
    case ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleCollectionProducts: payload
      }

      
      

    default:
      return state
  }
}

export default productsReducer
