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
import Collections from './pages/admin/collections/collections.component'
import { setCurrentUser } from './redux/user/user.actions'

const App = ({ currentUser }) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/profile' component={UserProfile} />
        <Route exact path='/sign-in' render={() => currentUser ? <Redirect to='/' /> : <AuthenticationPage /> } />
        <Route exact path='/admin/collections' component={Collections} />
      </Switch>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })

export default connect(mapStateToProps)(App)