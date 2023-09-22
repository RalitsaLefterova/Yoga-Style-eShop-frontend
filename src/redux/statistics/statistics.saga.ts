import { takeLatest, all, call, put } from 'typed-redux-saga'
import axios from 'axios'

import StatisticsActionTypes from './statistics.types'
import {
  fetchDailyOrdersStatisticSuccess,
  fetchDailyOrdersStatisticFailed,
  fetchMonthlyOrdersStatisticSuccess,
  fetchMonthlyOrdersStatisticFailed,
  fetchYearlyOrdersStatisticSuccess,
  fetchYearlyOrdersStatisticFailed,
  fetchTop3BestsellingProductsSuccess,
  fetchTop3BestsellingProductsFailed,
} from './statistics.actions'
import {
  getDailyOrdersStatistic,
  getMonthlyOrdersStatistic,
  getYearlyOrdersStatistic,
  getTop3BestsellingProducts,
} from '../../rest-api/statistics'
import { ErrorResponse } from 'shared/interfaces/error-response'
import { handleRequestError } from 'components/request-error-handler/request-error-handler.component'


// FETCH DAILY ORDERS STATISTIC
export function* fetchDailyOrdersStatisticRequestedAsync() {
  try {
    const response = yield* call(getDailyOrdersStatistic)
    yield* put(fetchDailyOrdersStatisticSuccess(response.data))
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(fetchDailyOrdersStatisticFailed(apiError))
  }
}
export function* onFetchDailyOrdersStatisticRequested() {
  yield* takeLatest(StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_REQUESTED, fetchDailyOrdersStatisticRequestedAsync)
}

// FETCH TOP 3 BESTSELLING PRODUCTS
export function* fetchTop3BestsellingProductsRequestedAsync() {
  try {
    const response = yield* call(getTop3BestsellingProducts)
    yield* put(fetchTop3BestsellingProductsSuccess(response.data))
  } catch (error) {
    const apiError: ErrorResponse = handleRequestError(error)
    yield* put(fetchTop3BestsellingProductsFailed(apiError))
  }
}
export function* onFetchTop3BestsellingProductsRequested() {
  yield* takeLatest(StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_REQUESTED, fetchTop3BestsellingProductsRequestedAsync)
}

export function* statisticsSaga() {
  yield* all([
    call(onFetchDailyOrdersStatisticRequested),
    call(onFetchTop3BestsellingProductsRequested)
  ])
}