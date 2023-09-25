import { AnyAction } from 'redux'

import { 
  DailyOrdersStatistic, 
  MonthyOrdersStatistic, 
  Top3BestsellingProducts, 
  YearlyOrdersStatistic 
} from 'shared/types/statistics'
import {
  fetchDailyOrdersStatisticRequested,
  fetchDailyOrdersStatisticSuccess,
  fetchDailyOrdersStatisticFailed,
  fetchMonthlyOrdersStatisticRequested,
  fetchMonthlyOrdersStatisticSuccess,
  fetchMonthlyOrdersStatisticFailed,
  fetchYearlyOrdersStatisticRequested,
  fetchYearlyOrdersStatisticSuccess,
  fetchYearlyOrdersStatisticFailed,
  fetchTop3BestsellingProductsRequested,
  fetchTop3BestsellingProductsSuccess,
  fetchTop3BestsellingProductsFailed
} from './statistics.actions'

export type StatisticsState = {
  readonly dailyOrdersStatistic: DailyOrdersStatistic[]
  readonly monthlyOrdersStatistic: MonthyOrdersStatistic[]
  readonly yearlyOrdersStatistic: YearlyOrdersStatistic[]
  readonly top3BestsellingProducts: Top3BestsellingProducts | null
  readonly isLoading: boolean
  readonly isLoadingOrdersStatistic: boolean
  readonly isLoadingTop3BestsellingProducts: boolean
  readonly error: Error | null
  readonly errorOnFetchingOrdersStatistic: Error | null
  readonly errorOnFetchingTop3BestsellingProducts: Error | null
}

const INITIAL_STATE: StatisticsState = {
  dailyOrdersStatistic: [],
  monthlyOrdersStatistic: [],
  yearlyOrdersStatistic: [],
  top3BestsellingProducts: null,
  isLoading: false,
  isLoadingOrdersStatistic: false,
  isLoadingTop3BestsellingProducts: false,
  error: null,
  errorOnFetchingOrdersStatistic: null,
  errorOnFetchingTop3BestsellingProducts: null
}

const statisticsReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): StatisticsState => {

  if (
    fetchDailyOrdersStatisticRequested.match(action) ||
    fetchMonthlyOrdersStatisticRequested.match(action) ||
    fetchYearlyOrdersStatisticRequested.match(action)
  ) {
    return {
      ...state,
      isLoadingOrdersStatistic: false,
      errorOnFetchingOrdersStatistic: null,
    }
  }

  if (
    fetchDailyOrdersStatisticSuccess.match(action)
  ) {
    return {
      ...state,
      isLoadingOrdersStatistic: false,
      errorOnFetchingOrdersStatistic: null,
      dailyOrdersStatistic: action.payload
    }
  }

  if (
    fetchMonthlyOrdersStatisticSuccess.match(action)
  ) {
    return {
      ...state,
      isLoadingOrdersStatistic: false,
      errorOnFetchingOrdersStatistic: null,
      monthlyOrdersStatistic: action.payload
    }
  }

  if (
    fetchYearlyOrdersStatisticSuccess.match(action)
  ) {
    return {
      ...state,
      isLoadingOrdersStatistic: false,
      errorOnFetchingOrdersStatistic: null,
      yearlyOrdersStatistic: action.payload
    }
  }

  if (
    fetchDailyOrdersStatisticFailed.match(action) ||
    fetchMonthlyOrdersStatisticFailed.match(action) ||
    fetchYearlyOrdersStatisticFailed.match(action)
  ) {
    return {
      ...state,
      isLoadingOrdersStatistic: false,
      errorOnFetchingOrdersStatistic: action.payload
    }
  }

  if (
    fetchTop3BestsellingProductsRequested.match(action)
  ) {
    return {
      ...state,
      isLoadingTop3BestsellingProducts: true,
      errorOnFetchingTop3BestsellingProducts: null
    }
  }
    
  if (
    fetchTop3BestsellingProductsSuccess.match(action)
  ) {
    return {
      ...state,
      isLoadingTop3BestsellingProducts: false,
      errorOnFetchingTop3BestsellingProducts: null,
      top3BestsellingProducts: action.payload
    }
  }

  if (
    fetchTop3BestsellingProductsFailed.match(action)
  ) {
    return {
      ...state,
      isLoadingTop3BestsellingProducts: false,
      errorOnFetchingTop3BestsellingProducts: action.payload,
      top3BestsellingProducts: null
    }
  }

  return state
}

export default statisticsReducer