import { createSelector } from 'reselect'
import { RootState } from 'redux/root-reducer'
import { StatisticsState } from './statistics.reducer'

const selectStatisticsReducer = (state: RootState): StatisticsState => state.statistics

export const selectIsLoadingOrdersStatistic = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.isLoadingOrdersStatistic
)

export const selectErrorOnFetchingOrdersStatistic = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.errorOnFetchingOrdersStatistic
)

export const selectDailyOrdersStatistic = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.dailyOrdersStatistic
)

export const selecMonthlyOrdersStatistic = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.monthlyOrdersStatistic
)

export const selectYearlyOrdersStatistic = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.yearlyOrdersStatistic
)


export const selectIsLoadingTop3BestsellingProducts = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.isLoadingTop3BestsellingProducts
)

export const selectErrorOnFetchingTop3BestsellingProducts = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.errorOnFetchingTop3BestsellingProducts
)

export const selectTop3BestsellingProducts = createSelector(
  [selectStatisticsReducer],
  (statisticsSlide) => statisticsSlide.top3BestsellingProducts
)