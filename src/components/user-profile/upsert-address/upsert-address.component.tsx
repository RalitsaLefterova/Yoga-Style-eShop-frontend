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
        labelText='Name your address (e.g. "Home", "Ofice", etc.)'
        inputType='text'
        fieldName='title'
        inputValue={addressInfo && addressInfo.title ? addressInfo.title : ''}
        onChangeHandler={onChangeAddress}
      />
      <CustomInput
        labelText='Street'
        inputType='text'
        fieldName='street'
        inputValue={addressInfo && addressInfo.street ? addressInfo.street : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomInput
        labelText='City'
        inputType='text'
        fieldName='city'
        inputValue={addressInfo && addressInfo.city ? addressInfo.city : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomInput
        labelText='Postal Code'
        inputType='text'
        fieldName='postalCode'
        inputValue={addressInfo && addressInfo.postalCode ? addressInfo.postalCode : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomInput
        labelText='Country'
        inputType='text'
        fieldName='country'
        inputValue={addressInfo && addressInfo.country ? addressInfo.country : ''}
        onChangeHandler={onChangeAddress}
        required
      />
      <CustomButton name='address' onClick={onSaveAddress} inverted>{isEditAddress ? 'Save address' : 'Create address'}</CustomButton>
    </div>
  )
}

export default UpsertAddress