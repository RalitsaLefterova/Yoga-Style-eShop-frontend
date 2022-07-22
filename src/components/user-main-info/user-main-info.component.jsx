import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { convertDate, inputDate } from '../../components/utils/utils'
import { toggleIsEdit } from '../../redux/user/user.actions'
import { selectIsEdit, selectErrorOnEditUser } from '../../redux/user/user.selectors'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import './user-main-info.style.scss'

const UserMainInfo = ({ userData, handleSaveChanges }) => {
  const dispatch = useDispatch()
  const isEdit = useSelector(selectIsEdit)
  const errorOnEdit = useSelector(selectErrorOnEditUser)
  
  const [userMainInfo, setUserMainInfo] = useState({})
  const { fullName, email, birthday, phone } = userMainInfo

  const handleEdit = () => dispatch(toggleIsEdit())
  
  const handleCancel = () => {
    updateUserInfoObject()
    dispatch(toggleIsEdit())
  }
  
  const handleChange = event => {
    const { value, name } = event.target
    setUserMainInfo({ 
      ...userMainInfo,  
      [name]: {
        value,
        isChanged: true
      }
    })
  }

  const updateUserInfoObject = () => {
    let collectedData = {}
    userData && Object.entries(userData).forEach(([key, data]) => {
      collectedData[key] = { value: data, isChanged: false }
    })
    setUserMainInfo(collectedData)
  }

  useEffect(() => {
    console.log('second effect')
    updateUserInfoObject()
  }, [userData])

  console.log('in UserMainInfo', {isEdit}, {errorOnEdit}, {userData}, {userMainInfo})

  return (
    <>
      {isEdit ? (
        <>
          <FormInput
            type='text'
            name='fullName'
            defaultValue={fullName?.value}
            onChange={handleChange}
            label='Name'
            required />

          <FormInput
            name='email' 
            type='email'
            defaultValue={email?.value} 
            handleChange={handleChange}
            label='Email'
            required />

          <FormInput
            name='phone' 
            type='phone'
            defaultValue={phone?.value} 
            handleChange={handleChange}
            label='Phone' />

          <FormInput
            name='birthday' 
            type='date'
            defaultValue={convertDate(birthday?.value)} 
            handleChange={handleChange}
            label='Date of birth'
            max={inputDate('max')}
            min={inputDate('min')} />
          
          {errorOnEdit && (<div className='error-container error-color center'>{errorOnEdit}</div>)}

          <CustomButton onClick={handleCancel}>Cancel</CustomButton>
          <CustomButton onClick={handleSaveChanges(userMainInfo)} inverted>Save changes</CustomButton>
        </>
      ) : (
        <>
          {fullName?.value} {email?.value} {phone?.value} {birthday?.value}
          
          <CustomButton onClick={handleEdit}>Edit info</CustomButton>
        </>
      )}
      
    </>
  )
}

export default UserMainInfo