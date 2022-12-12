import React from 'react'
import { Outlet } from 'react-router-dom'

import AdminHeader from 'components/admin/admin-header/admin-header.component'
import AdminNavigation from 'components/admin/admin-navigation/admin-navigation.component'

import './layout-admin.style.scss'

const LayoutAdmin = () => {
  return (
    <div className='admin-container'>
      <AdminNavigation />
      <AdminHeader />
      <div className="admin-content-box">
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutAdmin