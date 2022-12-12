import React from "react"
import { Link, useLocation } from "react-router-dom"

import DashboardIcon from '../../../assets/svgs/dashboard.svg'
import CollectionsIcon from '../../../assets/svgs/collections.svg'
import ProductsIcon from '../../../assets/svgs/products.svg'
import OrdersIcon from '../../../assets/svgs/orders.svg'
import UsersIcon from '../../../assets/svgs/users.svg'

import './admin-navigation.style.scss'

const AdminNavigation = () => {
  const { pathname } = useLocation()

  return (
    <div className="vertical-nav-menu-container center">
        <div className='admin-page-title'>
          <h3>Yoga Style Admin</h3>
        </div>
        <ul className="sidebar_menu">
          <li>
            <Link to='/admin'>
              <div className="icon-menu">
                <DashboardIcon className='dashboard-icon' />
              </div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/collections'>
              <div className="icon-menu">
                <CollectionsIcon className='dashboard-icon' />
              </div>
              <span>Collections</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/products'>
              <div className="icon-menu">
                <ProductsIcon className='dashboard-icon' />
              </div>
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/orders'>
              <div className="icon-menu">
                <OrdersIcon className='dashboard-icon' />
              </div>
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/users'>
              <div className="icon-menu">
                <UsersIcon className='dashboard-icon' />
              </div>
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </div>  
  )
}

export default AdminNavigation