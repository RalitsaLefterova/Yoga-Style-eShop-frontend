import React, { ChangeEvent } from 'react'

import { convertDate, humanizeDate, inputDate } from '../../../shared/helpers'

import CustomInput from 'components/custom-components/custom-input/custom-input.component'
import CustomInputDate from 'components/custom-components/custom-input-date/custom-input-date.component'
import CustomButton from '../../custom-components/custom-button/custom-button.component'
import ErrorContainer from 'components/custom-components/error-container/error-container.component'

import './user-main-info.style.scss'

type UserMainInfoProps = {
  fullName?: string,
  email?: string,
  phone?: string,
  birthday?: string | Date,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void, 
  handleSaveChanges: () => void, 
  handleUpsert?: () => void, 
  isUpsert?: boolean, 
  errorOnEditLoggedUser: Error | null, 
  handleCancel: () => void,
  children?: JSX.Element | JSX.Element[]
}

const UserMainInfo = ({
  fullName,
  email,
  phone,
  birthday, 
  handleChange, 
  handleSaveChanges, 
  handleUpsert, 
  isUpsert, 
  errorOnEditLoggedUser, 
  handleCancel 
}: UserMainInfoProps) => {

  return (
    <>
      {isUpsert ? ( 
        <>
          <CustomInput
            inputType='text'
            fieldName='fullName'
            labelText='Name'
            onChangeHandler={handleChange}
            inputValue={fullName}
            required
          />
          <CustomInput
            inputType='email'
            fieldName='email'
            labelText='Email'
            onChangeHandler={handleChange}
            inputValue={email}
            required
          />
          <CustomInput
            inputType='phone'
            fieldName='phone'
            labelText='Phone'
            onChangeHandler={handleChange}
            inputValue={phone}
            required
          />
          <CustomInputDate
            labelText='Date of birth'
            fieldName='birthday'
            onChangeHandler={handleChange}
            dateValue={birthday}
            min={inputDate('min')} 
            max={inputDate('max')}
          />
          {errorOnEditLoggedUser && <ErrorContainer error={errorOnEditLoggedUser} />}
          <div className='edit-user-buttons-box'>
            <CustomButton onClick={handleCancel} additionalClasses='cancel-edit-btn'>Cancel</CustomButton>
            <CustomButton onClick={handleSaveChanges} additionalClasses='save-changes-btn'>Save changes</CustomButton>
          </div>
        </>
      ) : (
        <div className='user-main-info-preview'>
          <div className='user-info-row'>
            <span>Name:</span> <span>{fullName}</span>
          </div>
          <div className='user-info-row'>
            <span>Email:</span> <span>{email}</span>
          </div>
          <div className='user-info-row'>
            <span>Phone:</span> <span>{phone ? phone : 'not set'}</span>
          </div>
          <div className='user-info-row'>
            <span>Birthday:</span> 
            {/* <span>{(birthday instanceof Date || (typeof(birthday) === 'string' && !!birthday)) ? convertDate(birthday) : 'not set'}</span> */}
            <span>{birthday ? convertDate(birthday) : 'not set'}</span>
          </div>
          <div className='user-info-edit-btn-box'>
            <CustomButton onClick={handleUpsert} additionalClasses='user-info-edit-btn'>Edit info</CustomButton>
          </div>
        </div>
      )}
    </>
  )
}

export default UserMainInfo