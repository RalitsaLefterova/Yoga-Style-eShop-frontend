import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructorSelector } from 'reselect'

import './style/main.scss'

import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import HomePage from './pages/home/home.component'
import ShopPage from './pages/shop/shop.component'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;