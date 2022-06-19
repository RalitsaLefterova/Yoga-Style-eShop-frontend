import React from 'react'

import './address-preview.style.scss'

const AddressPreview = ({ address, onDeleteAddress, onEditAddress }) => {
  // console.log('AddressPreview', {address})
  const { _id, street, city, country, postalCode, defaultShippingAddress, defaultBillingAddress } = address
  return (
    <div className='address-box'>
      {defaultShippingAddress ? (<div>Default Shipping Address</div>) : null}
      {defaultBillingAddress ? (<div>Default Billing Address</div>) : null}
      <div>{street}</div>
      <div>{city}</div>
      <div>{postalCode}</div>
      <div>{country}</div>
      <button onClick={() => onEditAddress(address)}>edit</button>
      <button onClick={() => onDeleteAddress(_id)}>delete</button>
    </div>
  )
}

export default AddressPreview