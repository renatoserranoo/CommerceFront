import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route
          path="/payment"
          element={<ProtectedRoutes />}
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes