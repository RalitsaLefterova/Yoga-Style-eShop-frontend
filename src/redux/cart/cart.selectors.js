import { createSelector } from 'reselect'

const selectCartReducer = state => state.cart

export const selectCartProducts = createSelector(
  [selectCartReducer],
  (cart) => cart.cartProducts
)

export const selectCartProductsCount = createSelector(
  [selectCartProducts],
  cartProducts => cartProducts.reduce(
    (accumulatedQuantity, product) =>
      accumulatedQuantity + product.quantity,
    0
  )
)

export const selectCartTotal = createSelector(
  [selectCartProducts],
  cartProducts => cartProducts.reduce(
    (accumulatedTotalPrice, product) =>
      accumulatedTotalPrice + product.quantity * product.price,
    0
  )
)

export const selectCartHidden = createSelector(
  [selectCartReducer],
  (cart) => cart.hidden
)