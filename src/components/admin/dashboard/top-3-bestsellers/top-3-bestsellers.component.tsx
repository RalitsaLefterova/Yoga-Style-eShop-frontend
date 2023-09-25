import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 

import { fetchTop3BestsellingProductsRequested } from 'redux/statistics/statistics.actions'
import { selectTop3BestsellingProducts } from 'redux/statistics/statistics.selectors'
import { isNotEmptyObject } from 'shared/helpers'
import { Top3BestsellingProducts } from 'shared/types/statistics'

import PodiumItem from '../podium-item/podium-item.component'

import './top-3-bestsellers.style.scss'

const Top3Bestsellers = () => {
  const dispatch = useDispatch()
  const top3BestsellingProducts: Top3BestsellingProducts | null = useSelector(selectTop3BestsellingProducts)

  console.log({top3BestsellingProducts})

  const generatePodium = () => {
    const { first, second, third } = top3BestsellingProducts as Top3BestsellingProducts

    const places = [
      { place: 'second', color: 'silver', product: second.product },
      { place: 'first', color: 'gold', product: first.product },
      { place: 'third', color: 'bronze', product: third.product }
    ]

    return (
      <>
        {places.map(({ place, color, product }) => (
          <PodiumItem
            key={place}
            place={place}
            color={color}
            product={product}
          />
        ))}
      </>
    )
  }

  useEffect(() => {
    dispatch(fetchTop3BestsellingProductsRequested())
  }, [])

  return (
    <>
      <p>
        <h3>Top 3 Bestselling Products</h3>
      </p>
      <div className="podium">
        {top3BestsellingProducts !== null && isNotEmptyObject(top3BestsellingProducts) ?
          <>{generatePodium()}</>
          : 
          <div>No orders have been placed yet.</div>
        }
      </div>
    </>
  )
}

export default Top3Bestsellers