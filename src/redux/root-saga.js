import { all, call } from 'redux-saga/effects'

import { userSaga } from './user/user.saga'
import { collectionsSaga } from './collections/collections.saga'

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(collectionsSaga)
  ])
}