import React, { ChangeEvent } from 'react'

import { convertDate, inputDate } from '../../../shared/helpers'

import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import CustomButton from '../../custom-components/custom-button/custom-button.component'

import './user-main-info.style.scss'

type UserMainInfoProps = {
  fullName: string,
  email: string,
  phone: string,
  birthday: Date, 
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void, 
  // handleSaveChanges, 
  // handleUpsert, 
  isUpsert: boolean, 
  // errorOnEdit, 
  // handleCancel
}

const UserMainInfo = ({
  fullName,
  email,
  phone,
  birthday, 
  handleChange, 
  // handleSaveChanges, 
  // handleUpsert, 
  isUpsert, 
  // errorOnEdit, 
  // handleCancel 
}: UserMainInfoProps) => {

  return (
    <>
      {console.log('user main info', {isUpsert})}
      {isUpsert ? ( 
        <>
          <CustomInput
            type='text'
            name='fullName'
            field='fullName'
            label='Name'
            onChangeHandler={handleChange}
            value={fullName}
            required
          />
          <CustomInput
            type='email'
            name='email'
            field='email'
            label='Email'
            onChangeHandler={handleChange}
            value={email}
            required
          />
          <CustomInput
            type='phone'
            name='phone'
            field='phone'
            label='Phone'
            onChangeHandler={handleChange}
            value={phone}
            required
          />
          <CustomInput
            label='Date of birth'
            type='date'
            name='birthday'
            field='birthday'
            onChangeHandler={handleChange}
            value={convertDate(birthday)}
            max={inputDate('max')}
            min={inputDate('min')} 
          />
          
          {/* {errorOnEdit instanceof String  ? (<div className='error-container error-color center'>{errorOnEdit}</div>) : null}
          
          <CustomButton onClick={handleCancel}>Cancel</CustomButton>
          <CustomButton onClick={handleSaveChanges} inverted>Save changes</CustomButton> */}
        </>
      ) : (
        <>
          {fullName} {email} {phone} {birthday}
          
          {/* <CustomButton onClick={handleUpsert}>Edit info</CustomButton> */}
        </>
      )}
      
    </>
  )
}

export default UserMainInfo