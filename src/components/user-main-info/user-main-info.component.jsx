import React from 'react'

import { convertDate, inputDate } from '../../components/utils/utils'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './user-main-info.style.scss'

const UserMainInfo = ({
  fullName,
  email,
  phone,
  birthday, 
  handleChange, 
  handleSaveChanges, 
  handleUpsert, 
  isUpsert, 
  errorOnEdit, 
  handleCancel 
}) => {

  return (
    <>
      {console.log({isUpsert})}
      {isUpsert ? (
        <>
          <FormInput
            type='text'
            name='fullName'
            defaultValue={fullName}
            onChange={handleChange}
            label='Name'
            required />

          <FormInput
            name='email' 
            type='email'
            defaultValue={email} 
            handleChange={handleChange}
            label='Email'
            required />

          <FormInput
            name='phone' 
            type='phone'
            defaultValue={phone} 
            handleChange={handleChange}
            label='Phone' />

          <FormInput
            name='birthday' 
            type='date'
            defaultValue={convertDate(birthday)} 
            handleChange={handleChange}
            label='Date of birth'
            max={inputDate('max')}
            min={inputDate('min')} />
          
          {errorOnEdit instanceof String  ? (<div className='error-container error-color center'>{errorOnEdit}</div>) : null}
          
          <CustomButton onClick={handleCancel}>Cancel</CustomButton>
          <CustomButton onClick={handleSaveChanges} inverted>Save changes</CustomButton>
        </>
      ) : (
        <>
          {fullName} {email} {phone} {birthday}
          
          <CustomButton onClick={handleUpsert}>Edit info</CustomButton>
        </>
      )}
      
    </>
  )
}

export default UserMainInfo