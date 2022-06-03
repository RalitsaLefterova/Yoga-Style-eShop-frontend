import React from 'react'

import './custom-input.style.scss'

const CustomInput = ({ type, field, value = '', onChangeHandler }) => {
  
  return (
    <div className="flex">
          <label htmlFor={field}>{field}</label>
          {type == 'file' ? 
          (<img src={value} alt='collection-cover' />) :
          ''}
          <input
            type={type}
            name={field}
            id={field}
            onChange={onChangeHandler}
            value={type == 'file' ? '' : value} 
            
          />
        </div>
  )
}

export default CustomInput