import ProductsActionTypes from './products.types'

const INITIAL_STATE = {
  allProducts: [], //in admin only
  singleCollectionProducts: [], 
  product: {},
  isLoading: false,
  error: null
}

const productsReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {

    case ProductsActionTypes.FETCHING_START:
      return {
        ...state,
        isLoading: true
      }

    case ProductsActionTypes.FETCHING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    
    case ProductsActionTypes.FETCH_SINGLE_COLLECTION_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleCollectionProducts: payload
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
          product: payload
        }

    default:
      return state
  }
}

export default productsReducer
