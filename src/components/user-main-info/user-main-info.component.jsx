import React, { useState } from 'react'

import { convertDate, inputDate } from '../../components/utils/utils'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './user-main-info.style.scss'

const UserMainInfo = ({ 
  fullName, 
  email, 
  birthday, 
  phone, 
  isEdit, 
  handleEdit, 
  handleChangeData, 
  handleSaveChanges,
  error
}) => {

  return (
    <>
      {isEdit ? (
        <>
          <FormInput
            type='text'
            name='fullName'
            defaultValue={fullName}
            onChange={handleChangeData}
            label='Name'
            required />
          <FormInput
            name='email' 
            type='email'
            defaultValue={email} 
            handleChange={handleChangeData}
            label='Email'
            required />
          <FormInput
            name='phone' 
            type='phone'
            defaultValue={phone} 
            handleChange={handleChangeData}
            label='Phone' />
          <div className='group'>
            <label className='form-input-label shrink'>
              Date of birth:
            </label>
            <input 
              type='date' 
              name='birthday' 
              className='form-input' 
              onChange={handleChangeData} 
              defaultValue={convertDate(birthday)}
              max={inputDate('max')}
              min={inputDate('min')} />
          </div>
          <div>{error && error}</div>
          <CustomButton onClick={handleSaveChanges} inverted>Save changes</CustomButton>
        </>
      ) : (
        <>
          {fullName} {email} {phone} {birthday}
          <CustomButton onClick={handleEdit}>Edit info</CustomButton>
        </>
      )}
      
    </>
  )
}

export default UserMainInfo