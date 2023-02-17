import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

import './product-preview.style.scss'

const ProductPreview = ({ product }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { title, mainImageUrl, price, id } = product
  
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