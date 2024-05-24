import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PixCreate from '../components/PixCreate';

const ProtectedRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
        isAuthenticated ? <PixCreate /> : <Navigate to="/login" />
    )
};

export default ProtectedRoutes;