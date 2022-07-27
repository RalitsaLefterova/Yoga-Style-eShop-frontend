import React from 'react'

import TrashIcon from '../../assets/svgs/trash.svg'

import './address-preview.style.scss'

const AddressPreview = ({ 
  address, 
  onDeleteAddress, 
  onEditAddress, 
  onSetAsDefaultAddress,
  shippingAddress, 
  billingAddress
}) => {
  
  const { _id: addressId, street, city, country, postalCode, title } = address

  // console.log('AddressPreview', {address}, {shippingAddress}, {billingAddress})

  const labelText = () => {
    if (shippingAddress && billingAddress && shippingAddress === billingAddress && shippingAddress === addressId) {
      return 'Default shipping and billing address'
    }

    if (shippingAddress && shippingAddress === addressId) {
      return 'Default shipping address'
    }

    if (billingAddress && billingAddress === addressId) {
      return 'Default billing address'
    }
  }


  return (
    <div className='address-box'>

      {labelText() && (<div className='default-address-label'>{labelText()}</div>)}

      <div className='address-data'>

        <div className='address-title'>{title} TITLE here</div>
        <div>{street}</div>
        <div>{city}</div>
        <div>{postalCode}</div>
        <div>{country}</div>

        {billingAddress !== addressId ? (
          <span 
            className='set-default-address-links' 
            onClick={() => onSetAsDefaultAddress(addressId, 'billingAddress')}
          >
            Set as billing address
          </span>
        ) : null}

        {shippingAddress !== addressId ? (
          <>
            {billingAddress && billingAddress !== addressId && (' / ')}
            <span 
              className='set-default-address-links' 
              onClick={() => onSetAsDefaultAddress(addressId, 'shippingAddress')}
            >
              Set as shipping address
            </span>
          </>
        ) : null} 

        <div className='address-buttons'>
          <div className='edit-button' onClick={() => onEditAddress(address)}>
            <TrashIcon className='trash-icon' />
          </div>
          <div className='delete-button' onClick={() => onDeleteAddress(_id)}>
            <TrashIcon className='trash-icon' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AddressPreview