import { useSelector } from 'react-redux'

import { selectProduct } from 'redux/products/products.selectors'
import { GenericObject } from 'shared/types/common'
import { Product, ProductColor } from 'shared/types/products'

import ProductColorPreview from '../product-color-preview/product-color-preview.component'

import './product-colors-list.style.scss'

const ProductColorsList = () => {
  const selectedProduct: Product | GenericObject = useSelector(selectProduct)
  const productId: string = selectedProduct.id
  const colors: ProductColor[] = selectedProduct.colors

  // console.log('in ProductColorsList:', selectedProduct, colors)
  return (
    <div>
      {colors && colors.length > 0 ? 
        (
          <table className='colors-table'>
            <thead>
              <tr>
                <th>Color</th>
                <th>Images</th>
                <th>Sizes & Stock</th>
              </tr>
            </thead>
            <tbody>
              {productId && colors.map(colorItem => (
                <ProductColorPreview key={colorItem._id} colorData={colorItem} productId={productId} />
              ))}
            </tbody> 
          </table>
        ) 
        : (
          <div>There are no additional information added yet.</div>
        )
      }
    </div>
  )
}

export default ProductColorsList