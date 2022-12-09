import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from './redux/user/user.selectors'

import Spinner from './components/spinner/spinner.component'
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import AdminNavigation from './components/admin/admin-navigation/admin-navigation.component' 

// Shop part
const CustomAlert = lazy(() => import('./components/custom-alert/custom-alert.component'))
const HomePage = lazy(() => import('./pages/home/home.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const UserProfile = lazy(() => import('./pages/user-profile/user-profile.component'))
const AuthenticationPage = lazy(() => import('./pages/authentication/authentication.component'))
const SignIn = lazy(() => import('./components/sign-in/sign-in.component'))
const SignUp = lazy(() => import('./components/sign-up/sign-up.component'))
const ForgotPassword = lazy(() => import('./components/forgot-password/forgot-password.component'))
const ResetPassword = lazy(() => import('./components/reset-password/reset-password.component'))
const SingleCollection = lazy(() => import('./pages/single-collection/single-collection.component'))
const ProductDetails = lazy(() => import('./pages/product-details/product-details.component'))
const Checkout = lazy(() => import('./pages/checkout/checkout.component'))

// Admin part
const AdminHomePage = lazy(() => import('./pages/admin/admin-home/admin-home.component'))
const Collections = lazy(() => import('./pages/admin/collections/collections.component'))
const Products = lazy(() => import('./pages/admin/products/products.component'))
const AddProduct = lazy(() => import('./pages/admin/add-product/add-product.component'))
const EditProduct = lazy(() => import('./pages/admin/edit-product/edit-product.component'))
const Orders = lazy(() => import('./pages/admin/orders/orders.component'))
const OrderDeatils = lazy(() => import('./pages/admin/order-details/order-details.component'))


import './style/main.scss'
// import { googleLogin } from './rest-api/users'

const App = () => {
const currentUser = useSelector(selectCurrentUser)

const location = useLocation()
// console.log({location})

const { pathname } = useLocation()
// console.log({pathname})

const background = location.state && location.state.background
// console.log({background})

  return (
    <Suspense fallback={<Spinner />}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:collection' element={<SingleCollection />} />
        <Route path='/shop/:collection/:productId' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<UserProfile />} />
        {/* <Route path='/sign-in' element={currentUser ? <Navigate replace to='/' /> : <AuthenticationPage />} /> */}
        <Route path='/sign-in' element={currentUser ? <Navigate replace to='/' /> : <SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/admin' element={<AdminNavigation />} />
        <Route path='/admin/collections' element={<Collections />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/products/add' element={<AddProduct />} />
        <Route path='/admin/products/edit/:id' element={<EditProduct />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/admin/orders/:id' element={<OrderDeatils />} />
        {/* <Route path='/modal' element={<CustomAlert state={{ background: location }} />} /> */}
      </Routes>
      <Footer />
      {/* {background && (
        <Routes>
          <Route path='/modal' element={<CustomAlert state={{ background: location }} />} />
        </Routes>
      )} */}
      <CustomAlert />
    </Suspense>
  )
}

export default App