import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructorSelector } from 'reselect'

import './style/main.scss'

import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import HomePage from './pages/home/home.component'
import ShopPage from './pages/shop/shop.component'
import UserProfile from './pages/user-profile/user-profile.component'
import AuthenticationPage from './pages/authentication/authentication.component'
import SingleCollection from './pages/single-collection/single-collection.component'
import ProductDetails from './pages/product-details/product-details.component'
import AdminHomePage from './pages/admin/admin-home/admin-home.component'
import Collections from './pages/admin/collections/collections.component'
import Products from './pages/admin/products/products.component'
import AddProduct from './pages/admin/add-product/add-product.component'
import EditProduct from './pages/admin/edit-product/edit-product.component'

const App = ({ currentUser }) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/shop/:collection' component={SingleCollection} />
        <Route exact path='/shop/:collection/:productId' component={ProductDetails} />
        <Route path='/profile' component={UserProfile} />
        <Route exact path='/sign-in' render={() => currentUser ? <Redirect to='/' /> : <AuthenticationPage /> } />
        <Route exact path='/admin' component={AdminHomePage} />
        <Route exact path='/admin/collections' component={Collections} />
        <Route exact path='/admin/products' component={Products} />
        <Route exact path='/admin/products/add' component={AddProduct} />
        <Route exact path='/admin/products/:id' component={EditProduct} />
      </Switch>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(App)