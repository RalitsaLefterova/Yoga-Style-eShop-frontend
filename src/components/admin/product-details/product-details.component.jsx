import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { editProduct } from '../../../rest-api/products'

import './product-details.style.scss'

const ProductDetails = ({ match, product }) => {
  const [active, setActive] = useState(product.active)

  const handleChangeActive = (newValue, id) => {
    const data = new FormData()
    data.append('active', newValue)

    editProduct(id, data)
      .then(response => {
        setActive(response.data.active)
      })
      .catch(e => console.log(e))
  }

  return (
    <tr>
      <th>
        <input 
          type='checkbox' 
          name='active' 
          onChange={() => handleChangeActive(!active, product.id)}
          checked={active ? 'checked' : ''}
          value={active}
        />
      </th>
      <th>{product.title}</th>
      <th>{product.price}</th>
      <th>{product.stock ? product.stock : 0}</th>
      <th>
        <Link to={`${match.url}/${product.id}`}>Edit</Link>
      </th>
    </tr>
  )
}

export default withRouter(ProductDetails)