import React from "react";
import { withRouter, Link } from "react-router-dom";

import './products.style.scss'

const Products = ({history, match}) => {

  const handleAddNewProduct = () => {
    console.log('inside add new product')
    
  }

  return (
    <div className="center">
      <Link to='/admin'>Back to home</Link>
      <div className='page-title'>
        <h3>Manage Products</h3>
      </div>
      <div className='add-product-button'>
        <button onClick={() => history.push(`${match.url}/add`)}>Add Product</button>
      </div>
      {/* show list of products with pagination */}
      {/* implement filter with options: by collection, by status (hidden/active) */}
      <div>List of Products</div>
    </div>
  )
}

export default withRouter(Products)