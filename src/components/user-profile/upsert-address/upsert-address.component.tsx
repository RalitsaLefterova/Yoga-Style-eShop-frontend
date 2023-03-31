import { ChangeEventHandler, InputHTMLAttributes } from 'react'

import { Address } from 'shared/types/addresses'

import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import CustomButton from '../../custom-components/custom-button/custom-button.component'

import './upsert-address.style.scss'

type UpsertAddressProps = {
  addressInfo: Address,
  isEditAddress: boolean,
  onChangeAddress: ChangeEventHandler<HTMLInputElement> 
  onSaveAddress: () => void
} & InputHTMLAttributes<HTMLInputElement>

const UpsertAddress = ({ addressInfo, isEditAddress, onChangeAddress, onSaveAddress }: UpsertAddressProps) => {

  // console.log('in upsert address', addressInfo)

  return (
    <div>
      <CustomInput
        label='Name your address (e.g. "Home", "Ofice", etc.)'
        type='text'
        name='title'
        field='title'
        value={addressInfo && addressInfo.title ? addressInfo.title : ''}
        onChangeHandler={onChangeAddress}
      />
      <CustomInput
        label='Street'
        type='text'
        name='street'
        field='street'
        value={addressInfo && addressInfo.street ? addressInfo.street : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomInput
        label='City'
        type='text'
        name='city'
        field='city'
        value={addressInfo && addressInfo.city ? addressInfo.city : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomInput
        label='Postal Code'
        type='text'
        name='postalCode'
        field='postalCode'
        value={addressInfo && addressInfo.postalCode ? addressInfo.postalCode : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomInput
        label='Country'
        type='text'
        name='country'
        field='country'
        value={addressInfo && addressInfo.country ? addressInfo.country : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomButton name='address' onClick={onSaveAddress} inverted>{isEditAddress ? 'Save address' : 'Create address'}</CustomButton>
    </div>
  )
}

export default UpsertAddress