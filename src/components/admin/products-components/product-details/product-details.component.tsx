import { Fragment, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Product } from 'shared/types/products'
import { editProductRequested } from 'redux/products/products.actions'

import './product-details.style.scss'

type ProductDetailsType = {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id: productId } = product
  const [active, setActive] = useState(product.active)

  const handleChangeActive = (newValue: boolean) => {
    const data = new FormData()
    data.append('active', JSON.stringify(newValue))
    setActive(newValue)
    productId && dispatch(editProductRequested(productId, data, navigate))

    // editProduct(id, data)
    //   .then(response => {
    //     setActive(response.data.active)
    //   })
    //   .catch(e => console.log(e))
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
      <th>{product.title}</th>
      <th>{product.price}</th>
      <th>{product.stock ? product.stock : 0}</th>
      <th>
        <Link to={`${pathname}/edit/${product.id}`}>Edit</Link>
      </th>
    </tr>
  )
}

export default ProductDetails