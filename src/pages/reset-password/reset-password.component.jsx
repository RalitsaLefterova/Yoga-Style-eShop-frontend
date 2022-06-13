import React, { useState } from "react"

import FormInput from '../../components/form-input/form-input.component'

import './reset-password.style.scss'


const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const handleChange = event => {
    setEmail(event.target.value)
  }

  return (
    <div className="reset-password-container">
      <form>
        <FormInput
          name='email' 
          type='email'
          value={email || ''} 
          handleChange={handleChange}
          label='Email'
          required
        />
        <button type='submit'>Reset password</button>
      </form>
    </div>
  )
}

export default ResetPassword