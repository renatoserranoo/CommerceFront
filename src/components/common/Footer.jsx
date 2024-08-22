import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>Redes Sociais</h4>
          <ul>
            <li><a href="#home">WhatsApp</a></li>
            <li><a href="#about">Instagram</a></li>
            <li><a href="#services">Facebook</a></li>
          </ul>
        </div>
        <div className="footer-section links">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="#home">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#services">Serviços</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contato</h4>
          <ul>
            <li><a href="mailto:contato@exemplo.com">emaildecontato@exemplo.com</a></li>
            <li><p>Telefone: +55 11 98765-4321</p></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Commerce. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;