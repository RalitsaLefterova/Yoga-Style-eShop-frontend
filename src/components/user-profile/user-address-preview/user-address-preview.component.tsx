import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'

import './user-address-preview.style.scss'
import { Address } from 'shared/types/addresses'

type UserAddressPreviewProps = {
  address: Address, 
  onDeleteAddress: (addressId: string) => void, 
  onEditAddress: (address: Address) => void, 
  onSetAsDefaultAddress: (addressId: string, type: string) => void,
  shippingAddress: string, 
  billingAddress: string
}

const UserAddressPreview = ({ 
  address, 
  onDeleteAddress, 
  onEditAddress, 
  onSetAsDefaultAddress,
  shippingAddress, 
  billingAddress
}: UserAddressPreviewProps) => {
  
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

      {labelText() && (<span className='default-address-label'>{labelText()}</span>)}

      <div className='address-data'>

        <div className='address-title bold'>{title}</div>
        <div>{street}</div>
        <div>{postalCode}, {city}</div>
        <div>{country}</div>
        <div className='set-default-address-links'>
          {addressId && billingAddress !== addressId ? (
            <span onClick={() => onSetAsDefaultAddress(addressId, 'billingAddress')} >
              Set as billing address
            </span>
          ) : null}

          {addressId && shippingAddress !== addressId ? (
            <>
              {billingAddress && billingAddress !== addressId && (' / ')}
              <span onClick={() => onSetAsDefaultAddress(addressId, 'shippingAddress')}>
                Set as shipping address
              </span>
            </>
          ) : null} 
        </div>

        <div className='address-buttons'>
          <div className='edit-button' onClick={() => onEditAddress(address)}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
          <div className='delete-button' onClick={() => onDeleteAddress(addressId)}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserAddressPreview