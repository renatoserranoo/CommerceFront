import React, { useState } from 'react';
import api from '../hooks/Api';
import { Link } from 'react-router-dom'


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/user/register', {
        name,
        email,
        password,
      });
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <div className='card-login'>
      <h3>Registre-se</h3>
      <form onSubmit={handleSubmit}>
        <div className='textfield'>
          <label>Nome:</label>
          <input
            placeholder='Digite seu nome...'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder='Crie sua senha...'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='btn-login'>Registrar</button>
        <div>
          <p className='have-account'>Já possui uma conta? <Link to="/login">Fazer Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;