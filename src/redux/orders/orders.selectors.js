import { createSelector } from 'reselect'

const selectOrdersReducer = state => state.orders

export const selectOrders = createSelector(
  [selectOrdersReducer],
  (orders) => orders.ordersList
)

export const selectSelectedOrderDetails = createSelector(
  [selectOrdersReducer],
  (orders) => orders.selectedOrder
)