import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchSingleCollectionProductsRequested } from '../../redux/products/products.actions'
import { selectSingleCollectionProducts, selectIsLoading } from '../../redux/products/products.selectors'
import { selectSelectedCollection } from 'redux/collections/collections.selectors'
import { Product } from '../../shared/types/products'
import { Collection } from 'shared/types/collections'

import ProductPreview from '../../components/product-preview/product-preview.component'
import Spinner from '../../components/spinner/spinner.component'

import './single-collection.style.scss'

type CollectionRouteParams = {
  collectionTitle: string
}

const SingleCollection = () => {
  const dispatch = useDispatch()
  const { collectionTitle } = useParams<CollectionRouteParams>()
  
  const isLoading: boolean = useSelector(selectIsLoading)
  const singleCollectionProductsList: Product[] = useSelector(selectSingleCollectionProducts)
  const selectedCollection: Collection = useSelector(selectSelectedCollection)

  console.log({selectedCollection})

  const { title, collectionTeaser } = selectedCollection

  const pageTitle = (collectionTitle as string).replace(/-/g, ' ').replace('and', '&').toUpperCase()

  useEffect(() => {
    collectionTitle && dispatch(fetchSingleCollectionProductsRequested(collectionTitle))
  }, [])

  return (
    <div className='single-collection-preview'>
      <h1 className='title center'>{pageTitle}</h1>
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
            <div className='teaser-text-container center' >
              <h4>
                {collectionTeaser ? 
                  <div 
                    className='padding-top-bottom-20' 
                    dangerouslySetInnerHTML={{ __html: collectionTeaser }}
                  /> 
                : 
                  <div>
                    <h2 className='padding-top-bottom-20'>Exciting News Coming Soon!</h2>
                    <p className='padding-top-bottom-20'>
                      While we're busy preparing something extraordinary, we couldn't wait to share it with you. 
                      <br />
                      Our latest collection is on the horizon, and it's going to be nothing short of amazing. 
                      <br />
                      Stay tuned for a grand unveiling that will redefine your shopping experience.
                    </p>
                    <p className='padding-top-bottom-20'>
                      In the meantime, explore our existing <Link className='underline' to={'/shop'}>collections</Link> and discover a world of style, quality, and fashion. 
                      <br />
                      We promise the wait will be worth it, and we can't wait to have you as part of this exciting journey.
                    </p>
                    <p className='padding-top-bottom-20'>
                      Thank you for choosing us as your shopping destination. <br />
                      Your support fuels our passion for bringing you the very best in fashion and lifestyle. <br />
                    </p>
                    <h3 className='padding-top-bottom-20'>Get ready to be dazzled!</h3>
                  </div>
                }
              </h4>
            </div>
          ))
      }
    </div>
  )
}

export default SingleCollection