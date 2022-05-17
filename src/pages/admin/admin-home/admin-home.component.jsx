import React from "react";
import { withRouter, Link } from "react-router-dom";

import './admin-home.style.scss'

const AdminHomePage = ({history, match}) => {

  console.log(match, history)

  return (
    <div className='admin-home-container center'>
      <div className='page-title'>
        <h3>Admin Home Page</h3>
      </div>
      <div>
        <Link to={`${match.url}/collections`}>Manage Collections</Link>
        {/* <button onClick={() => history.push(`${match.url}/collections`)}>Manage Collections</button> */}
        <Link to={`${match.url}/products`}>Manage Products</Link>
      </div>
    </div>
  )
}

export default withRouter(AdminHomePage)