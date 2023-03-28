import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Product } from 'shared/types/products'
import { editProductRequested } from 'redux/products/products.actions'
import { formatCurrency } from 'shared/helpers'

import './product-details.style.scss'

type ProductDetailsType = {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id: productId , title, price, stock, active: activeStatus } = product
  const [active, setActive] = useState(activeStatus)

  const handleChangeActive = (newValue: boolean) => {
    const data = new FormData()
    data.append('active', JSON.stringify(newValue))
    setActive(newValue)
    productId && dispatch(editProductRequested(productId, data, navigate))
  }

  return (
    <tr>
      <th>
        <input 
          type='checkbox' 
          name='active' 
          onChange={() => handleChangeActive(!active)}
          // value={active}
          // checked={active ? 'checked' : ''}
          checked={active}
        />
      </th>
      <th>{title}</th>
      <th>{formatCurrency(price)}</th>
      <th>{stock ? stock : 0}</th>
      <th>
        <Link to={`${pathname}/edit/${productId}`}>Edit</Link>
      </th>
    </tr>
  )
}

export default ProductDetails