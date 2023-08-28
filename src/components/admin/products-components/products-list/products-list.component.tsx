import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchAllProductsRequested } from '../../../../redux/products/products.actions'
import { selectAllProduct } from '../../../../redux/products/products.selectors'

import ProductDetails from '../product-details/product-details.component'
import CustomSearch from 'components/custom-components/custom-search/custom-search.component'
import YogaStyleButton from 'components/custom-components/yoga-style-button/yoga-style-button.component'

import './products-list.style.scss'

const ProductsList = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const productsList = useSelector(selectAllProduct)

  useEffect(() => {
    dispatch(fetchAllProductsRequested())
  }, [])

  return (
    <div className='manage-products center'>
      <div className='page-title left'>
        <h1>Manage Products</h1>
      </div>
      <div className='products-controllers center'>
        <div className='add-product-button'>
          {/* <button onClick={() => navigate(`${pathname}/add`)}>Add Product</button> */}
          <YogaStyleButton
             onClick={() => navigate(`${pathname}/add`)}
          >
            Add Product
          </YogaStyleButton>
        </div>
        <div className='search-wrapper'>
          {/* TODO: Implement functionality for searching specific product */}
          {/* {productsList.length > 0 && <CustomSearch />} */}
        </div>
      </div>
      
      <div className='table-container'>
        {productsList.length > 0 ? (
          <table>
            {/* <caption>Products Information</caption> */}
            <thead>
              <tr>
                <th className='active-status-box'>Active</th>
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
        ) : (
          <h3 className='padding-top-bottom-50'>No products have been added yet.</h3>
        )}
      </div>
      
      {/* show list of products with pagination */}
      {/* implement sorting */}
      {/* implement filter with options: by collection, by status (hidden/visible) */}

    </div>
  )
}

export default ProductsList