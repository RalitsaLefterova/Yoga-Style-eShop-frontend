import { useNavigate, useLocation } from 'react-router-dom'

import { Product } from 'shared/types/products'

import './product-preview.style.scss'

type ProductPreviewType = {
  product: Product
}

const ProductPreview = ({ product }: ProductPreviewType) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id, title, mainImageUrl, price } = product
  
  return (
    <div 
      className="product-item" 
      onClick={() => navigate(`${pathname}/${id}`)} 
    >
      <div 
        className='image'
        style={{
          backgroundImage: `url(${process.env.BACKEND_URL}/${mainImageUrl})`
        }}
      />
      <div className='product-footer'>
        <span className='title'>{title}</span>
        <span className='price'>{price}</span>
      </div>
    </div>
  )
}

export default ProductPreview