import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchAllProductsRequested } from '../../../redux/products/products.actions'
import { selectAllProduct } from '../../../redux/products/products.selectors'

import ProductDetails from '../../../components/admin/product-details/product-details.component'

import './products.style.scss'

const Products = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const productsList = useSelector(selectAllProduct)

  useEffect(() => {
    dispatch(fetchAllProductsRequested())
  }, [])

  return (
    <div className="center">
      <Link to='/admin'>Back to home</Link>
      <div className='page-title'>
        <h3>Manage Products</h3>
      </div>
      <div className='add-product-button'>
        <button onClick={() => navigate(`${pathname}/add`)}>Add Product</button>
      </div>
      <div className='table-container'>
        <table>
          <caption>Products Information</caption>
          <thead>
            <tr>
              <th>Active</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {productsList.map(product => (
            <ProductDetails key={product.id} product={product} />
          ))}
          </tbody>
        </table>
      </div>
      
      {/* show list of products with pagination */}
      {/* implement filter with options: by collection, by status (hidden/active) */}

    </div>
  )
}

export default Products