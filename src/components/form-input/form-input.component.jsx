import React from 'react';

import './form-input.style.scss';

const FormInput = ({handleChange, label, ...otherProps}) => (
  <div className='group'>
    {/* {console.log('in FormInput component')} */}
    {
      label ? 
      (<label className={`form-input-label ${otherProps.defaultValue?.length ? 'shrink' : ''}`}>
        {label}
      </label>)
      : null
    }
    <input className='form-input' onChange={handleChange} {...otherProps} />
  </div>
)

export default FormInput;