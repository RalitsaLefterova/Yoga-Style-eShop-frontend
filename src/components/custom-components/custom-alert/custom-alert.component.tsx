import { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { navigateAfterSessionExpired } from '../../../redux/user/user.actions'

import './custom-alert.style.scss'
import CustomButton from '../custom-button/custom-button.component'

type DataValProps = {
  title?: string, 
  text?: JSX.Element | string,
  type?: string, 
  textCenter?: boolean,
  showCancelButton?: boolean, 
  cancelButtonText?: string,
  showConfirmButton?: boolean,
  confirmButtonText?: string, 
  onConfirmRedirectTo?: string,
  onConfirmAction?: () => void,
  showCloseButton?: boolean,
  hasSessionExpired?: boolean
}

let toggleModal = (showVal: boolean, dataVal: DataValProps) => {}

const CustomAlert = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  // console.log({location})
  const [show, setShow] = useState(false)
  const [data, setData] = useState<DataValProps>({})

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
    hasSessionExpired,
    showConfirmButton
  } = data

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
      dispatch(navigateAfterSessionExpired(navigate))
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
              {showCancelButton && cancelButtonText && 
                <CustomButton onClick={handleCloseModal} additionalClasses='btn-type-cancel'>
                  <span>{cancelButtonText}</span>
                </CustomButton>
              }
              {confirmButtonText && 
                <CustomButton onClick={handleConfirm} additionalClasses={type === 'warning' ? 'btn-type-warning' : ''}>
                  <span>{confirmButtonText}</span>
                </CustomButton>}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export { toggleModal }
export default CustomAlert