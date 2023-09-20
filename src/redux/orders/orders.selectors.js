import { createSelector } from 'reselect'

const selectOrdersReducer = state => state.orders

export const selectIsLoading = createSelector(
  [selectOrdersReducer],
  (orders) => orders.isLoading
)

export const selectOrders = createSelector(
  [selectOrdersReducer],
  (orders) => orders.ordersList
)

export const selectSelectedOrderDetails = createSelector(
  [selectOrdersReducer],
  (orders) => orders.selectedOrder
)

export const selectOrdersError = createSelector(
  [selectOrdersReducer],
  (orders) => orders.ordersError
)

export const selectPaymentError = createSelector(
  [selectOrdersReducer],
  (orders) => orders.paymentError
)