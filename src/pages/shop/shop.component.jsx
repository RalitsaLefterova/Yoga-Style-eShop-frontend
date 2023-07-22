import React from 'react'

import CollectionsList from '../../components/collections-list/collections-list.component';

import './shop.style.scss'

class ShopPage extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      
    }
  }

  render() {
    return (
      <div className='shop-container'>
        <CollectionsList />
      </div>
    )
  }
}

export default ShopPage