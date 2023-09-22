import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

import { fetchDailyOrdersStatisticRequested } from 'redux/statistics/statistics.actions'
import { selectDailyOrdersStatistic } from 'redux/statistics/statistics.selectors'
import { DailyOrdersStatistic } from 'shared/types/statistics'
import { getMonthShortName } from 'shared/helpers'

const OrdersStatistic = () => {
  const dispatch = useDispatch()
  const dailyOrdersStatistic = useSelector(selectDailyOrdersStatistic)

  // console.log({dailyOrdersStatistic})

  const dailyOrdersData = dailyOrdersStatistic.map(dailyOrder => {
    const { year, month, day } = dailyOrder.dateAttributes
    return { 
      name: getMonthShortName(month) + ' ' + day, 
      orders: dailyOrder.totalOrders
    }
  }).sort((a, b) => {
    // Use localeCompare to compare the strings, which works well for sorting strings like dates
    return a.name.localeCompare(b.name);
  })

  // console.log({dailyOrdersData})

  useEffect(() => {
    dispatch(fetchDailyOrdersStatisticRequested())
  }, [])


  return (
    <>
      <p>
        <h3>Orders per day ( last 10 days )</h3>
      </p>
      <div className='line-chart-container'>
        <LineChart
          width={600}
          height={300}
          data={dailyOrdersData}
        >
          <Line type='monotone' dataKey='orders' stroke='#2196F3' strokeWidth={3} />
          <CartesianGrid stroke='#ccc' />
          <XAxis dataKey='name' />
          <YAxis dataKey='orders' />
          <Tooltip />
          {/* <Legend /> */}
        </LineChart>
      </div>
    </>
  )
}

export default OrdersStatistic