import React, { useState } from 'react';
import api from '../hooks/Api';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      const token = response.data.token;
      localStorage.setItem('token', token);

      console.log('User Logged in:', response.data);
      navigate('/payment'); //dashboard soon
    } catch (error) {
      console.error('There was an error logging the user!', error);
    }
  };

  return (
    <div className='card-login'>
      <h3>Acesse sua conta</h3>
      <form onSubmit={handleSubmit}>
        <div className='textfield'>
          <label>Email:</label>
          <input
            placeholder='Digite seu email...'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='textfield'>
          <label>Senha:</label>
          <input
            placeholder='Digite sua senha...'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='btn-login'>Login</button>
        <p className='have-account'>Não possui uma conta? <Link to="/">Criar Conta</Link></p>
      </form>
    </div>
  );
};

export default Login;