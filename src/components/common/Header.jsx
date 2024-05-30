import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <nav className="navbar">
        <p><a href="/">&lsaquo;Pay/&rsaquo;</a></p>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/payment">Conta</Link></li>
          <li><Link to="/payment">Pix</Link></li>
        </ul>
      </nav>
  </div>
  )
}

export default Header