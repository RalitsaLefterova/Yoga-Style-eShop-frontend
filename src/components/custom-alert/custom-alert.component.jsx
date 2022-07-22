import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import './custom-alert.style.scss'

let toggleModal = () => {}

const CustomAlert = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)

  const { 
    title, 
    text, 
    type, 
    showCancelButton, 
    confirmButtonColor, 
    confirmButtonText, 
    closeOnConfirm, 
    onConfirmRedirectTo 
  } = data || {}

  console.log('inside CustomAlert')

  toggleModal = (showVal, dataVal) => {
    console.log('props', showVal, dataVal)
    setData(dataVal)
    setShow(showVal)
  }
  
  const handleConfirm = () => {
    navigate(onConfirmRedirectTo)
    setShow(false)
  }

  const handleCloseModal = () => {}

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
    {console.log('inside CustomAlert')}
      {show && 
        <div className='alert-modal-container'>
          <div className='modal-elements-container'>
            <div className='right' onClick={handleCloseModal}>x</div>
            <div><h1>{title}</h1></div>
            <div>{text}</div>
            {showCancelButton && <button>Cancel</button>}
            <button onClick={handleConfirm}>{confirmButtonText}</button>
          </div>
        </div>
      }
    </>
  )
}

export { toggleModal }
export default CustomAlert