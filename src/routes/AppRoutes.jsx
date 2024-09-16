import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
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
import ProductRegistration from '../hooks/ProductRegistration';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/*' element={<LayoutWithHeader />} >
          <Route path='' element={<Home />} />
          <Route path='payment' element={<ProtectedRoutes element={PixCreate} />} />
          <Route path='product/:id' element={<ProductPage />} />
          <Route path='cart' element={<ProtectedRoutes element={Cart} />} />
          <Route path='product-edit' element={<ProductRegistration/>}/>
          <Route path='product-edit/:id' element={<ProductRegistration/>}/>
        </Route>
      </Routes>
    </>
  );
};

const LayoutWithHeader = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default AppRoutes;
