import React from "react";
import { Link, useLocation } from "react-router-dom";

import './admin-home.style.scss'

const AdminHomePage = () => {
  const { pathname } = useLocation()

  return (
    <div className='admin-home-container center'>
      <div className='page-title'>
        <h3>Admin Home Page</h3>
      </div>
      <div>
        <Link to={`${pathname}/collections`}>Manage Collections</Link>
        <Link to={`${pathname}/products`}>Manage Products</Link>
      </div>
    </div>
  )
}

export default AdminHomePage