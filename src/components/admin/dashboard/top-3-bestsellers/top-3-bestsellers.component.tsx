import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 

import { fetchTop3BestsellingProductsRequested } from 'redux/statistics/statistics.actions'
import { selectTop3BestsellingProducts } from 'redux/statistics/statistics.selectors'

import './top-3-bestsellers.style.scss'
import YogaStyleThumbnail from 'components/custom-components/yoga-style-thumbnail/yoga-style-thumbnail.component'
import { Top3BestsellingProducts } from 'shared/types/statistics'

const Top3Bestsellers = () => {
  const dispatch = useDispatch()
  const top3BestsellingProducts: Top3BestsellingProducts = useSelector(selectTop3BestsellingProducts)

  console.log(top3BestsellingProducts)

  const { first, second, third } = top3BestsellingProducts

  useEffect(() => {
    dispatch(fetchTop3BestsellingProductsRequested())
  }, [])

  return (
    <>
      <p>
        <h3>Top 3 Bestselling Products</h3>
      </p>
      <div className="podium">
        <div className="place second">
          <div className='image-box'>
            <YogaStyleThumbnail image={second.product.mainImageUrl} />
          </div>
          <div className='top silver-box' />
          <div className='base'>
            <span>{second.product.title} more test text more and morrkdffkgkdf text bla bla bla</span>
          </div>
        </div>
        <div className="place first">
          <div className='image-box'>
            <YogaStyleThumbnail image={first.product.mainImageUrl} /> 
          </div>
          <div className='top gold-box' />
          <div className='base'>
            <span>{first.product.title} more test text more and morrkdffkgkdf text bla bla bla</span> 
          </div>
        </div>
        <div className="place third">
          <div className='image-box'>
            <YogaStyleThumbnail image={third.product.mainImageUrl} />
          </div>
          <div className='top bronze-box' />
          <div className='base'>
            <span>{third.product.title} more test text more and morrkdffkgkdf text bla bla bla</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Top3Bestsellers