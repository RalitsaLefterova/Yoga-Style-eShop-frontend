/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { sessionExpired } from '../../../redux/user/user.actions'

import './custom-alert.style.scss'

let toggleModal = () => {}

const CustomAlert = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  // console.log({location})
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)

  const { 
    title, 
    text, 
    type, 
    textCenter,
    showCancelButton, 
    cancelButtonText,
    confirmButtonText, 
    onConfirmRedirectTo,
    onConfirmAction,
    showCloseButton,
    hasSessionExpired
  } = data || {}

  // console.log('inside CustomAlert')

  toggleModal = (showVal, dataVal) => {
    console.log('props', showVal, dataVal)
    setData(dataVal)
    setShow(showVal)
  }
  
  const handleConfirm = () => {
    onConfirmAction && onConfirmAction()
    onConfirmRedirectTo && navigate(onConfirmRedirectTo)

    if (hasSessionExpired) {
      dispatch(sessionExpired({ navigate }))
      navigate('/sign-in')
      // setShow(false)
    }

    setShow(false)
  }

  const handleCloseModal = () => {
    setShow(false)
  }

  const getBackgroundColor = useCallback(() => {
    {
      switch (type) {
        case 'success':
          return 'SUCCESS'
        case 'warning':
          return 'WARNING'
        case 'error':
          return 'ERROR'
        case 'info':
          return 'PRIMARY'
        default:
          return 'PRIMARY'
      }
    }
  }, [type])

  

  return (
    <>
      {show && 
        <div className='alert-modal-container'>
          <div className='modal-elements-container'>

            {showCloseButton && 
              <div className='right' onClick={handleCloseModal}>x</div>
            }
            
            <div>
              <h1 className='center'>{title}</h1>
            </div>

            <div className={textCenter ? "center" : ""}>{text}</div>

            <div className='buttons-box'>
              {showCancelButton && 
                <button onClick={handleCloseModal}>
                  {cancelButtonText}
                </button>
              }
              <button onClick={handleConfirm}>
                {confirmButtonText}
              </button>
            </div>

            

          </div>
        </div>
      }
    </>
  )
}

export { toggleModal }
export default CustomAlert