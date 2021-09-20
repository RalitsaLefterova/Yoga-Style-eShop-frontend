import React from 'react'

import CollectionsList from '../../components/collections-list/collections-list.component';

class ShopPage extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {

    }
  }

  render() {
    return (
      <div>
        SHOP PAGE
        <CollectionsList />
      </div>
    )
  }
}

export default ShopPage