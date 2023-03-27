import { FormEvent } from 'react'

import './custom-search.style.scss'

const CustomSearch = () => {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }
  return (
    <form className='search-form' onSubmit={handleSubmit} role='search'>
      <input type='search' className='search-term' placeholder='Search...' autoFocus required />
      <button type='submit' className='search-button'>
        <i className='fa fa-search'></i>
      </button>    
    </form>
  )
}

export default CustomSearch