import { Product } from './products'

export type DailyOrdersStatistic = {
  dateAttributes: {
    year: number,
    month: number,
    day: number
  },
  totalOrders: number,
  dateString: string
}

export type MonthyOrdersStatistic = {
  dateAttributes: {
    year: number,
    month: number
  },
  totalOrders: number,
  dateString: string
}

export type YearlyOrdersStatistic = {
  dateAttributes: {
    year: number
  },
  totalOrders: number,
  dateString: string
}

export type Top3BestsellingProducts = {
  first: {
    product: Product,
    totalQuantity: number,
    mostRecentOrderDate: string
  },
  second: {
    product: Product,
    totalQuantity: number,
    mostRecentOrderDate: string
  },
  third: {
    product: Product,
    totalQuantity: number,
    mostRecentOrderDate: string
  }
}