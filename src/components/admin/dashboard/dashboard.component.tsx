import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import OrdersStatistic from './orders-statistic/orders-statistic.component'
import Top3Bestsellers from './top-3-bestsellers/top-3-bestsellers.component'

import './dashboard.style.scss'


const Dashboard = () => {

  return (
    <div className='admin-page-container center'>
      <div className='page-title left'>
        <h1>Dashboard</h1>
      </div>
      <div className='statistics-container'>
        <div className='orders-statistics-container'>
          <OrdersStatistic />
        </div>
        <div className='top-3-products-container'>
          <Top3Bestsellers />
        </div>
      </div>
      <p className='padding-top-bottom-50'>Some other statistics here...</p>
    </div>
  )
}

export default Dashboard