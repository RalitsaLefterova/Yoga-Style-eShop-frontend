import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { fetchDailyOrdersStatisticRequested } from 'redux/statistics/statistics.actions'
import { selectDailyOrdersStatistic } from 'redux/statistics/statistics.selectors'
import { DailyOrdersStatistic } from 'shared/types/statistics'
import { getMonthShortName } from 'shared/helpers'

import './orders-statistic.style.scss'

const OrdersStatistic = () => {
  const dispatch = useDispatch()
  const dailyOrdersStatistic = useSelector(selectDailyOrdersStatistic)

  console.log({dailyOrdersStatistic})

  const dailyOrdersData = dailyOrdersStatistic.map(dailyOrder => {
    const { year, month, day } = dailyOrder.dateAttributes
    return { 
      name: getMonthShortName(month) + ' ' + day,
      orders: dailyOrder.totalOrders
    }
  })

  console.log({dailyOrdersData})

  useEffect(() => {
    dispatch(fetchDailyOrdersStatisticRequested())
  }, [])

  return (
    <>
      <p className='statistic-title'>
        Orders per day ( last 10 days )
      </p>
      <div className='line-chart-container'>
        <ResponsiveContainer width={700} height="95%">
          <LineChart
            // width={600}
            // height={300}
            data={dailyOrdersData}
          >
            <Line type='monotone' dataKey='orders' stroke='#2196F3' strokeWidth={3} />
            <CartesianGrid stroke='#ccc' />
            <XAxis dataKey='name' />
            <YAxis dataKey='orders' />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default OrdersStatistic