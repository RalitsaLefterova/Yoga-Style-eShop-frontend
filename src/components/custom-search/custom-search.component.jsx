import React from 'react'

import './custom-search.style.scss'

const CustomSearch = () => {
  return (
    <form className='search-form' onsubmit='event.preventDefault();' role='search'>
      <input type='search' className='search-term' placeholder='Search...' autofocus required />
      <button type='submit' className='search-button'>
        <i className='fa fa-search'></i>
      </button>    
    </form>
  )
}

export default CustomSearch