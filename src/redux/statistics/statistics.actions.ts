import StatisticsActionTypes from './statistics.types'
import { createAction, Action, withMatcher, ActionWithPayload } from '../reducer.utils'
import { DailyOrdersStatistic, MonthyOrdersStatistic, YearlyOrdersStatistic } from 'shared/types/statistics'
import { Top3BestsellingProducts } from 'shared/types/statistics'


// FETCH DAILY ORDERS STATISTIC
export type FetchDailyOrdersStatisticRequested = Action<StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_REQUESTED>
export const fetchDailyOrdersStatisticRequested = withMatcher((): FetchDailyOrdersStatisticRequested =>
  createAction(StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_REQUESTED))

export type FetchDailyOrdersStatisticSuccess = ActionWithPayload<StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_SUCCESS, DailyOrdersStatistic[]>
export const fetchDailyOrdersStatisticSuccess = withMatcher((dailyOrdersStatistic: DailyOrdersStatistic[]): FetchDailyOrdersStatisticSuccess =>
  createAction(StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_SUCCESS, dailyOrdersStatistic))

export type FetchDailyOrdersStatisticFailed = ActionWithPayload<StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_FAILED, Error>
export const fetchDailyOrdersStatisticFailed = withMatcher((error: Error): FetchDailyOrdersStatisticFailed =>
  createAction(StatisticsActionTypes.FETCH_DAILY_ORDERS_STATISTIC_FAILED, error))


// FETCH MONTHLY ORDERS STATISTIC
export type FetchMonthlyOrdersStatisticRequested = Action<StatisticsActionTypes.FETCH_MONTHLY_ORDERS_STATISTIC_REQUESTED>
export const fetchMonthlyOrdersStatisticRequested = withMatcher((): FetchMonthlyOrdersStatisticRequested =>
  createAction(StatisticsActionTypes.FETCH_MONTHLY_ORDERS_STATISTIC_REQUESTED))

export type FetchMonthlyOrdersStatisticSuccess = ActionWithPayload<StatisticsActionTypes.FETCH_MONTHLY_ORDERS_STATISTIC_SUCCESS, MonthyOrdersStatistic[]>
export const fetchMonthlyOrdersStatisticSuccess = withMatcher((monthlyOrdersStatistic: MonthyOrdersStatistic[]): FetchMonthlyOrdersStatisticSuccess =>
  createAction(StatisticsActionTypes.FETCH_MONTHLY_ORDERS_STATISTIC_SUCCESS, monthlyOrdersStatistic))

export type FetchMonthlyOrdersStatisticFailed = ActionWithPayload<StatisticsActionTypes.FETCH_MONTHLY_ORDERS_STATISTIC_FAILED, Error>
export const fetchMonthlyOrdersStatisticFailed = withMatcher((error: Error): FetchMonthlyOrdersStatisticFailed =>
  createAction(StatisticsActionTypes.FETCH_MONTHLY_ORDERS_STATISTIC_FAILED, error))


// FETCH YEARLY ORDERS STATISTIC
export type FetchYearlyOrdersStatisticRequested = Action<StatisticsActionTypes.FETCH_YEARLY_ORDERS_STATISTIC_REQUESTED>
export const fetchYearlyOrdersStatisticRequested = withMatcher((): FetchYearlyOrdersStatisticRequested =>
  createAction(StatisticsActionTypes.FETCH_YEARLY_ORDERS_STATISTIC_REQUESTED))

export type FetchYearlyOrdersStatisticSuccess = ActionWithPayload<StatisticsActionTypes.FETCH_YEARLY_ORDERS_STATISTIC_SUCCESS, YearlyOrdersStatistic[]>
export const fetchYearlyOrdersStatisticSuccess = withMatcher((yearlyOrdersStatistic: YearlyOrdersStatistic[]): FetchYearlyOrdersStatisticSuccess =>
  createAction(StatisticsActionTypes.FETCH_YEARLY_ORDERS_STATISTIC_SUCCESS, yearlyOrdersStatistic))

export type FetchYearlyOrdersStatisticFailed = ActionWithPayload<StatisticsActionTypes.FETCH_YEARLY_ORDERS_STATISTIC_FAILED, Error>
export const fetchYearlyOrdersStatisticFailed = withMatcher((error: Error): FetchYearlyOrdersStatisticFailed =>
  createAction(StatisticsActionTypes.FETCH_YEARLY_ORDERS_STATISTIC_FAILED, error))


// FETCH TOP 3 BESTSELLING PRODUCTS
export type FetchTop3BestsellingProductsRequested = Action<StatisticsActionTypes.FETCH_TOP_3_BESTSELLING_PRODUCTS_REQUESTED>
export const fetchTop3BestsellingProductsRequested = withMatcher((): FetchTop3BestsellingProductsRequested =>
  createAction(StatisticsActionTypes.FETCH_TOP_3_BESTSELLING_PRODUCTS_REQUESTED))

export type FetchTop3BestsellingProductsSuccess = ActionWithPayload<StatisticsActionTypes.FETCH_TOP_3_BESTSELLING_PRODUCTS_SUCCESS, Top3BestsellingProducts>
export const fetchTop3BestsellingProductsSuccess = withMatcher((top3BestsellingProducts: Top3BestsellingProducts): FetchTop3BestsellingProductsSuccess =>
  createAction(StatisticsActionTypes.FETCH_TOP_3_BESTSELLING_PRODUCTS_SUCCESS, top3BestsellingProducts))

export type FetchTop3BestsellingProductsFailed = ActionWithPayload<StatisticsActionTypes.FETCH_TOP_3_BESTSELLING_PRODUCTS_FAILED, Error>
export const fetchTop3BestsellingProductsFailed = withMatcher((error: Error): FetchTop3BestsellingProductsFailed =>
  createAction(StatisticsActionTypes.FETCH_TOP_3_BESTSELLING_PRODUCTS_FAILED, error))