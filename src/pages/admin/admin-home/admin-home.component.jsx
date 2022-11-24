import React from "react"
// import { useLocation } from "react-router-dom"



import Collections from "components/admin/collections/collections.component"

import './admin-home.style.scss'

const AdminHomePage = () => {
  // const { pathname } = useLocation()

  return (
    <div className='admin-home-container center'>
      
      

      <div className="main-content">
        <div className="logged-user-box">
          logged admin user info here
        </div>
        <div className="admin-content-box">
          <Collections />
        </div>
      </div>

      

    </div>
  )
}

export default AdminHomePage