import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Product } from 'shared/types/products'
import { editProductRequested, deleteProductRequested } from 'redux/products/products.actions'
import { formatCurrency } from 'shared/helpers'

import './product-details.style.scss'

type ProductDetailsType = {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id: productId , title, price, stock, active: activeStatus, mainImageUrl } = product
  const [active, setActive] = useState(activeStatus)

  const handleChangeActive = (newValue: boolean) => {
    const data = new FormData()
    data.append('active', JSON.stringify(newValue))
    setActive(newValue)
    productId && dispatch(editProductRequested(productId, data, navigate))
  }

  const handleDeleteProduct = () => {
    dispatch(deleteProductRequested(productId))
  }

  return (
    <tr>
      <th>
        <input 
          type='checkbox' 
          name='active' 
          onChange={() => handleChangeActive(!active)}
          checked={active}
        />
      </th>
      <th>
        <div className='product-title-box'>
          <div 
          className='img-container'
          style={{backgroundImage: `url(${process.env.BACKEND_URL}/${mainImageUrl})`}} 
        />
          {title}
        </div>
      </th>
      <th>{formatCurrency(price)}</th>
      <th>{stock ? stock : 0}</th>
      <th className='edit-product-box'>
        <Link to={`${pathname}/edit/${productId}`}>
          <span title="Edit product">
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </Link>
      </th>
      <th className='delete-product-box'>
        <span onClick={handleDeleteProduct} title="Delete product">
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </th>
    </tr>
  )
}

export default ProductDetails