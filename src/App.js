import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from './redux/user/user.selectors'

import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import HomePage from './pages/home/home.component'
import ShopPage from './pages/shop/shop.component'
import UserProfile from './pages/user-profile/user-profile.component'
import AuthenticationPage from './pages/authentication/authentication.component'
import ResetPassword from './pages/reset-password/reset-password.component'
import SingleCollection from './pages/single-collection/single-collection.component'
import ProductDetails from './pages/product-details/product-details.component'
import AdminHomePage from './pages/admin/admin-home/admin-home.component'
import Collections from './pages/admin/collections/collections.component'
import Products from './pages/admin/products/products.component'
import AddProduct from './pages/admin/add-product/add-product.component'
import EditProduct from './pages/admin/edit-product/edit-product.component'
import Checkout from './pages/checkout/checkout.component'

import './style/main.scss'

const App = () => {
const currentUser = useSelector(selectCurrentUser)

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:collection' element={<SingleCollection />} />
        <Route path='/shop/:collection/:productId' element={<ProductDetails />} />
        <Route path={'/checkout'} element={<Checkout />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/sign-in' element={currentUser ? <Navigate replace to='/' /> : <AuthenticationPage />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/admin' element={<AdminHomePage />} />
        <Route path='/admin/collections' element={<Collections />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/products/add' element={<AddProduct />} />
        <Route path='/admin/products/edit/:id' element={<EditProduct />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App