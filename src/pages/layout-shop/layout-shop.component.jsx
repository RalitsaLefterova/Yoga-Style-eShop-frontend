import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from 'components/header/header.component'
import Footer from 'components/footer/footer.component'

const LayoutShop = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutShop