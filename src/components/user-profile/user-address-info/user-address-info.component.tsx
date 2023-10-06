import { ChangeEvent } from 'react'

import { Address } from 'shared/types/addresses'

import UserAddressPreview from '../user-address-preview/user-address-preview.component'
import UpsertAddress from '../upsert-address/upsert-address.component'
import CustomButton from '../../custom-components/custom-button/custom-button.component'

import './user-address-info.style.scss'
import { GenericObject } from 'shared/types/common'

type UserAddressInfoProps = {
  addresses: Address[],
  shippingAddress: string, 
  billingAddress: string,
  isUpsert: boolean, 
  addressToUpsert: Address | GenericObject,
  isEditAddress: boolean,
  openCreateAddress: () => void,
  openEditAddress: (address: Address) => void,
  handleDeleteAddress: (addressId: string) => void,
  handleSetAsDefaultAddress: (addressId: string, type: string) => void,
  handleSaveChanges: () => void, 
  handleChangeAddress: (event: ChangeEvent<HTMLInputElement>) => void,
  errorOnEditLoggedUser: Error | null,
  handleCancel: () => void
}

const UserAddressInfo = ({
  addresses,
  shippingAddress, 
  billingAddress,
  isUpsert, 
  addressToUpsert,
  isEditAddress,
  openCreateAddress,
  openEditAddress,
  handleDeleteAddress,
  handleSetAsDefaultAddress,
  handleChangeAddress,
  handleSaveChanges, 
  errorOnEditLoggedUser,
  handleCancel
}: UserAddressInfoProps) => {

  const extractDefaultAddresses = () => {
    const defaultAddresses = [],
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
      {/* {console.log({isUpsert})} */}
      {isUpsert ? (
      <>
        <UpsertAddress 
          isEditAddress={isEditAddress}
          addressInfo={addressToUpsert}
          onSaveAddress={handleSaveChanges}
          onChangeAddress={handleChangeAddress}
          handleCancel={handleCancel}
          errorOnEditLoggedUser={errorOnEditLoggedUser}
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
                <UserAddressPreview
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
            <div className='no-address-message-wrapper'>You don't have default shipping and billing address</div>
          )}
        </div>
        <div>
          <h2>Additional Address Entries</h2>
          <hr />
          
          <div className='addresses-container'>
            {additionalAddresses && additionalAddresses.length > 0 ? (
              <>
                {additionalAddresses.map(address => (
                  <UserAddressPreview 
                    address={address} 
                    key={address._id}
                    onEditAddress={openEditAddress} 
                    onDeleteAddress={handleDeleteAddress}
                    shippingAddress={shippingAddress}
                    billingAddress={billingAddress}
                    onSetAsDefaultAddress={handleSetAsDefaultAddress}
                  />
                ))}
              </>
              ) : (
                <span className='no-address-message-wrapper'>You don't have additional addresses</span>
              )
            }
          </div> 
        </div>
        <div className='user-addresses-create-btn-box'>
          <CustomButton onClick={openCreateAddress}  additionalClasses='user-addresses-create-btn'>Add new address</CustomButton>
        </div>
      </div>
      )}
    </>
  )
}

export default UserAddressInfo