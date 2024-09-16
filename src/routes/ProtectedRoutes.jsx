import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';


const ProtectedRoutes = ({ element: Element }) => {
  const token = Cookies.get('JWT_TOKEN');
  const isAuthenticated = !!token

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoutes; 
