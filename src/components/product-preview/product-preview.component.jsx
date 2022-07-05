import React from "react"
import { withRouter } from "react-router-dom"

import './product-preview.style.scss'

const ProductPreview = ({ product, match, history }) => {
  const { title, mainImageUrl, price, id } = product
  
  return (
    <div className="product-item" onClick={() => history.push(`${match.url}/${id}`)} >
      <div 
        className='image'
        style={{
          backgroundImage: `url(${mainImageUrl})`
        }}
      />
      <div className='product-footer'>
        <span className='title'>{title}</span>
        <span className='price'>{price}</span>
      </div>
    </div>
  )
}



export default withRouter(ProductPreview)