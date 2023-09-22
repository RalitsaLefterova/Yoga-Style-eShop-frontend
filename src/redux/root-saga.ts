import { all, call } from 'typed-redux-saga'

import { userSaga } from './user/user.saga'
import { collectionsSaga } from './collections/collections.saga'
import { productsSaga } from './products/products.saga'
import { cartSaga } from './cart/cart.saga'
import { ordersSaga } from './orders/orders.saga'
import { statisticsSaga } from './statistics/statistics.saga'

export function* rootSaga() {
  yield* all([
    call(userSaga),
    call(collectionsSaga),
    call(productsSaga),
    call(cartSaga),
    call(ordersSaga),
    call(statisticsSaga)
  ])
}