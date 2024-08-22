import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Header from '../components/common/Header';
import PixCreate from '../pages/payments/PixCreate';
import Home from '../pages/home/Home';
import Footer from '../components/common/Footer';
import ProductPage from '../pages/products/ProductPage';
import ScrollToTop from '../components/common/ScrollToTop';
import Cart from '../pages/cart/Cart';

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/*' element={<LayoutWithHeader />} >
          <Route path='' element={<Home/>}/>
          <Route path='payment' element={<ProtectedRoutes element={PixCreate}/>}/>
          <Route path='product/:id' element={<ProductPage/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

const LayoutWithHeader = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default AppRoutes