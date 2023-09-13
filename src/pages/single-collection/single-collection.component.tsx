import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchSingleCollectionProductsRequested } from '../../redux/products/products.actions'
import { selectSingleCollectionProducts, selectIsLoading } from '../../redux/products/products.selectors'
import { Product } from '../../shared/types/products'

import ProductPreview from '../../components/product-preview/product-preview.component'
import Spinner from '../../components/spinner/spinner.component'

import './single-collection.style.scss'

type CollectionRouteParams = {
  collection: string
}

const SingleCollection = () => {
  const dispatch = useDispatch()
  const { collection } = useParams<keyof CollectionRouteParams>() as CollectionRouteParams
  const collectionTitle = collection?.replace(/-/g, ' ')
  const isLoading: boolean = useSelector(selectIsLoading)
  const singleCollectionProductsList: Product[] = useSelector(selectSingleCollectionProducts)

  useEffect(() => {
    collectionTitle && dispatch(fetchSingleCollectionProductsRequested(collectionTitle))
  }, [])

  return (
    <div className='single-collection-preview'>
      <h1 className='title center'>{collectionTitle?.toUpperCase()}</h1>
      {
        isLoading ?
          (<Spinner />) :
          (singleCollectionProductsList.length > 0 ? (
            <div className='products-container'>
              {singleCollectionProductsList.map(product => (
              <ProductPreview 
                key={product.id} 
                product={product} 
              />
            ))}
            </div>
          ) : (
            <>
              <h3>
                Get Ready for an Upgrade!
              </h3>
              <p>
                Our '{collectionTitle?.toUpperCase()}' collection is getting a makeover, 
                and we can't wait to reveal our fresh, fashion-forward styles. 
                Stay tuned for the hottest trends and timeless classics, all coming your way very soon!
              </p>
            </>
          ))
      }
    </div>
  )
}

export default SingleCollection