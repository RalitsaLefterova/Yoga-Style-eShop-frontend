import { RootState } from 'redux/root-reducer'
import { createSelector } from 'reselect'
import { CartState } from './cart.reducer'

const selectCartReducer = (state: RootState): CartState => state.cart

export const selectCartProducts = createSelector(
  [selectCartReducer],
  (cart) => cart.cartProducts
)

export const selectCartProductsCount = createSelector(
  [selectCartProducts],
  cartProducts => cartProducts.reduce(
    (accumulatedQuantity, product) =>
      product && accumulatedQuantity + product.quantity,
    0
  )
)

export const selectCartTotal = createSelector(
  [selectCartProducts],
  cartProducts => parseFloat((cartProducts.reduce(
      (accumulatedTotalPrice, product) =>
        accumulatedTotalPrice + product.quantity * product.price,
      0
    )).toFixed(2))
)

export const selectCartHidden = createSelector(
  [selectCartReducer],
  (cart) => cart.hidden
)