import React, { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './upsert-address.style.scss'

const UpsertAddress = ({ addressInfo, isEditAddress, onChangeAddress, onSaveAddress }) => {

  // console.log('in upsert address', addressInfo)

  return (
    <div>
      <FormInput
        type='text'
        name='street'
        value={addressInfo && addressInfo.street ? addressInfo.street : ''}
        onChange={onChangeAddress}
        label='Street'
        required
      />
      <FormInput
        type='text'
        name='city'
        value={addressInfo && addressInfo.city ? addressInfo.city : ''}
        onChange={onChangeAddress}
        label='City'
        required
      />
      <FormInput
        type='text'
        name='postalCode'
        value={addressInfo && addressInfo.postalCode ? addressInfo.postalCode : ''}
        onChange={onChangeAddress}
        label='Postal code'
        required
      />
      <FormInput
        type='text'
        name='country'
        value={addressInfo && addressInfo.country ? addressInfo.country : ''}
        onChange={onChangeAddress}
        label='Country'
        required
      />
      <CustomButton name='address' onClick={onSaveAddress} inverted>{isEditAddress ? 'Save' : 'Create'} address</CustomButton>
    </div>
  )
}

export default UpsertAddress