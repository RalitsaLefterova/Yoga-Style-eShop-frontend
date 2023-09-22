import axiosInstance from "./api-requests"

export const getDailyOrdersStatistic = () => axiosInstance.get('/statistics/daily-orders-statistic')

export const getMonthlyOrdersStatistic = () => axiosInstance.get('/statistics/monthly-orders-statistic')

export const getYearlyOrdersStatistic = () => axiosInstance.get('/statistics/yearly-orders-statistic')

export const getTop3BestsellingProducts = () => axiosInstance.get('/statistics/top-3-bestsellers')