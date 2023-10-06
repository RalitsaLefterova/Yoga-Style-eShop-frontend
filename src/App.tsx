import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from './redux/user/user.selectors'

import Spinner from './components/spinner/spinner.component'

import LayoutAdmin from 'pages/layout-admin/layout-admin.component'
import LayoutShop from 'pages/layout-shop/layout-shop.component'

// Shop part
const CustomAlert = lazy(() => import('./components/custom-components/custom-alert/custom-alert.component'))
const HomePage = lazy(() => import('./pages/home/home.component'))
const AboutUsPage = lazy(() => import('./pages/about-us/about-us.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const UserProfilePage = lazy(() => import('./pages/user-profile/user-profile.component'))
const SignIn = lazy(() => import('./components/authentication/sign-in/sign-in.component'))
const SignUp = lazy(() => import('./components/authentication/sign-up/sign-up.component'))
const ForgotPassword = lazy(() => import('./components/authentication/forgot-password/forgot-password.component'))
const ResetPassword = lazy(() => import('./components/authentication/reset-password/reset-password.component'))
const SingleCollection = lazy(() => import('./pages/single-collection/single-collection.component'))
const ProductDetails = lazy(() => import('./pages/product-details/product-details.component'))
const ShoppingCart = lazy(() => import('./pages/shopping-cart/shopping-cart.component'))
const Checkout = lazy(() => import('./pages/checkout/checkout.component'))


// Admin part
const Dashboard = lazy(() => import('./components/admin/dashboard/dashboard.component'))
const Collections = lazy(() => import('./components/admin/collections-components/collections/collections.component'))
const AddCollection = lazy(() => import('./components/admin/collections-components/add-collection/add-collection.component'))
const EditCollection = lazy(() => import('./components/admin/collections-components/edit-collection/edit-collection.component'))
const ProductsList = lazy(() => import('./components/admin/products-components/products-list/products-list.component'))
const AddProduct = lazy(() => import('./components/admin/products-components/add-product/add-product.component'))
const EditProduct = lazy(() => import('./components/admin/products-components/edit-product/edit-product.component'))
const OrdersList = lazy(() => import('./components/admin/orders-components/orders-list/orders-list.component'))
const OrderDetails = lazy(() => import('./components/admin/orders-components/order-details/order-details.component'))
const UsersList = lazy(() => import('./components/admin/users-components/users-list/users-list.component'))
const EditUser = lazy(() => import('./components/admin/users-components/edit-user/edit-user.component'))

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

// console.log({currentUser})
// console.log(currentUser !== null && currentUser.role)

  return (
    <Suspense fallback={<Spinner />}>
      
      <Routes>
        
        <Route path='/' element={<LayoutShop />} >
          <Route index element={<HomePage />} />
          <Route path='/about-us' element={<AboutUsPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/shop/:collectionTitle' element={<SingleCollection />} />
          <Route path='/shop/:collection/:productId' element={<ProductDetails />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<UserProfilePage />} />
          <Route path='/sign-in' element={currentUser ? <Navigate replace to='/' /> : <SignIn />} />
          <Route path='/sign-up' element={currentUser ? <Navigate replace to='/' /> : <SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        
        <Route path='/admin' element={currentUser && currentUser.role === 'ADMIN' ? <LayoutAdmin /> : <h2>Page Not Found</h2>} >
          <Route index element={<Dashboard />} />
          <Route path='/admin/collections' element={<Collections />} />
          <Route path='/admin/collections/add' element={<AddCollection />} />
          <Route path='/admin/collections/edit/:id' element={<EditCollection />} />
          <Route path='/admin/products' element={<ProductsList />} />
          <Route path='/admin/products/add' element={<AddProduct />} />
          <Route path='/admin/products/edit/:id' element={<EditProduct />} />
          <Route path='/admin/orders' element={<OrdersList />} />
          <Route path='/admin/orders/:id' element={<OrderDetails />} />
          <Route path='/admin/users' element={<UsersList />} />
          <Route path='/admin/users/edit/:id' element={<EditUser />} />
        </Route>

        <Route path='*' element={<h2>Page Not Found</h2>} />

      </Routes>
      
      <CustomAlert />
    </Suspense>
  )
}

export default App