import { Outlet } from 'react-router-dom'

import Header from 'components/header/header.component'
import Footer from 'components/footer/footer.component'

const LayoutShop = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutShop