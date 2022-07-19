import { all, call } from 'redux-saga/effects'

import { userSaga } from './user/user.saga'
import { collectionsSaga } from './collections/collections.saga'
import { productsSaga } from './products/products.saga'
import { cartSaga } from './cart/cart.saga'

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(collectionsSaga),
    call(productsSaga),
    call(cartSaga)
  ])
}