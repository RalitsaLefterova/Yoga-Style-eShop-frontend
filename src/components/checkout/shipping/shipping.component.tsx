import { Address } from 'shared/types/addresses'
import { Link } from 'react-router-dom'
import { isNotEmptyObject } from 'shared/helpers'

import './shipping.style.scss'

type ShippingProps = {
  shippingAddress: Address | null,
  error?: Error | string | null
}

const Shipping = ({ shippingAddress, error }: ShippingProps) => {

  
  // const { _id, city, country, postalCode, street, title } = shippingAddress as Address



  return (
    <div className='shipping-step-container'>
      {shippingAddress && isNotEmptyObject(shippingAddress) ?
        <>
          <h3>Delivery address:</h3>
          <div className='address-wrapper'>
            <span>{shippingAddress.street}</span>
            <span>{shippingAddress.postalCode} {shippingAddress.city}</span>
            <span>{shippingAddress.country}</span>
          </div>
          <div className='confirm-address-message center'>
            If this isn't the address where you'd like to receive your delivery, 
            you can update it on the <Link to='/profile'>'Profile'</Link> page.
          </div>
        </>
      :
        <div className='missing-address-message-wrapper center'>
          Your shipping address is not set up yet. 
          Please visit your <Link to='/profile'>'Profile'</Link> to provide one.
        </div>
      }
    </div>
  )
}

export default Shipping