import { useSelector } from 'react-redux'

import { selectProduct } from 'redux/products/products.selectors'
import { GenericObject } from 'shared/types/common'
import { Product, ProductColor } from 'shared/types/products'

import ProductColorPreview from '../product-color-preview/product-color-preview.component'

import './product-colors-list.style.scss'

const ProductColorsList = () => {
  const selectedProduct: Product = useSelector(selectProduct)
  const productId: string = selectedProduct.id
  const colors: ProductColor[] | undefined = selectedProduct.colors

  // console.log('in ProductColorsList:', selectedProduct, colors)
  return (
    <div>
      {colors && colors.length > 0 ? 
        (
          <>
            <h4 className='padding-top-bottom-50'>
              Below, you'll find a comprehensive overview of the product's color options, along with associated images. 
              To manage existing colors or introduce new ones, simply follow the instructions below:
            </h4>

            <ul className='left'>
              <li>
                <strong>Existing Colors:</strong> Here you can view the list of colors already associated with this product and their details.
              </li>
              <li>
                <strong>Images:</strong> Upload or replace images for each color to showcase your product's various variations. Keep your visuals fresh and engaging.
              </li>
              <li>
                <strong>Delete Images:</strong> If you need to remove an image associated with a color, simply click the <strong>`x`</strong> button on the top right corner of the image.
              </li>
              <li>
                <strong>Sizes & Stock:</strong> Add size options and manage stock information for each color variant. Ensure your inventory is up-to-date and easily accessible to customers.
              </li>
              <li>
                <strong>Delete Color:</strong> If you wish to remove a color option altogether, select it and delete it from the product.
              </li>
            </ul>
            <table className='colors-table'>
              <caption className='padding-top-bottom-50'>
                Available colors
              </caption>
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Images</th>
                  <th>Sizes & Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productId && colors.map(colorItem => (
                  <ProductColorPreview key={colorItem._id} colorData={colorItem} productId={productId} />
                ))}
              </tbody> 
            </table>
          </>
        ) : (
          <p>
            Currently, no additional color options have been included. 
          </p>
        )
      }
    </div>
  )
}

export default ProductColorsList