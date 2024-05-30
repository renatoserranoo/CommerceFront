import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Header from '../components/common/Header';
import PixCreate from '../pages/payments/PixCreate';
import Home from '../pages/home/Home';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/*' element={<LayoutWithHeader />} >
          <Route path='' element={<ProtectedRoutes element={Home}/>}/>
          <Route path='payment' element={<ProtectedRoutes element={PixCreate}/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

const LayoutWithHeader = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AppRoutes