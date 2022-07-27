import React, { useState } from 'react'

import AddressPreview from '../address-preview/address-preview.component'
import UpsertAddress from '../upsert-address/upsert-address.component'
import CustomButton from '../custom-button/custom-button.component'

import './user-address-info.style.scss'


const UserAddressInfo = ({
  addresses,
  shippingAddress, 
  billingAddress,
  handleSaveChanges, 
  isUpsert, 
  handleChangeAddress,
  isEditAddress,
  openCreateAddress,
  openEditAddress,
  handleDeleteAddress,
  addressToUpsert,
  handleSetAsDefaultAddress
}) => {

  const extractDefaultAddresses = () => {
    let defaultAddresses = [],
        shipping = addresses && addresses.filter(address => address._id === shippingAddress),
        billing = addresses && addresses.filter(address => address._id === billingAddress)
   
    if (shippingAddress && billingAddress && shippingAddress === billingAddress) {
      defaultAddresses.push(shipping[0]) 
    } else {
      shipping && shipping.length > 0 && defaultAddresses.push(shipping[0])
      billing && billing.length > 0 && defaultAddresses.push(billing[0])
    }

    return defaultAddresses
  }

  const additionalAddresses = addresses && addresses.filter(
    address => address._id !== shippingAddress && address._id !== billingAddress)

  return (
    <>
    {console.log({isUpsert})}
      {isUpsert ? (
      <>
        <UpsertAddress 
          isEditAddress={isEditAddress}
          addressInfo={addressToUpsert}
          onSaveAddress={handleSaveChanges}
          onChangeAddress={handleChangeAddress}
        />
      </>
      ) : (
      <div>
        <div>
          <h2>Default Addresses</h2>
          <hr />
          {shippingAddress || billingAddress ? (
            <div className='addresses-container'>
              {extractDefaultAddresses().map((address, index) => (
                <AddressPreview
                  address={address}
                  key={address._id+'_'+index}
                  onEditAddress={openEditAddress} 
                  onDeleteAddress={handleDeleteAddress}
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  onSetAsDefaultAddress={handleSetAsDefaultAddress}
                />
              ))}
            </div>
          ) : (
            <div>You don't have default shipping and billing address</div>
          )}
        </div>
        <div>
          <h2>Additional Address Entries</h2>
          <hr />
          
          {additionalAddresses && additionalAddresses.length > 0 ? (
            <div className='addresses-container'>
              {additionalAddresses.map(address => (
                <AddressPreview 
                  address={address} 
                  key={address._id}
                  onEditAddress={openEditAddress} 
                  onDeleteAddress={handleDeleteAddress}
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  onSetAsDefaultAddress={handleSetAsDefaultAddress}
                />
              ))}
            </div> 
          ) : (
            <div>You don't have additional addresses</div>
          )}
        </div>
        <CustomButton onClick={openCreateAddress} inverted>Add new address</CustomButton>
      </div>
      )}
    </>
  )
}

export default UserAddressInfo