import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import './admin-home.style.scss'

const AdminHomePage = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log({navigate}, {location})

  return (
    <div className='admin-home-container center'>
      <div className='page-title'>
        <h3>Admin Home Page</h3>
      </div>
      <div>
        <Link to={`${pathname}/collections`}>Manage Collections</Link>
        {/* <button onClick={() => history.push(`${match.url}/collections`)}>Manage Collections</button> */}
        <Link to={`${pathname}/products`}>Manage Products</Link>
      </div>
    </div>
  )
}

export default AdminHomePage