import React from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-5" style={{ backgroundColor: "#01081d", minWidth: '100%' }}>      
      <Container style={{minWidth: '90%'}} className="px-4">
        <Row>
          <Col md={3} title="About Us" className="text-start">
            <h5 className="text-white mb-3">Sobre nós</h5>
            <p className="text-light fs-6" style={{ opacity: 0.8 }}>
            Estamos dedicados a oferecer a melhor experiência de compra com produtos de qualidade e um serviço excepcional.
            </p>
            <div className="d-flex gap-4 mt-3 mb-3">
              <a href="#" className="text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white">
                <Twitter size={20} />
              </a>
            </div>
          </Col>

          <Col md={3} title="Quick Links" className="text-start">
            <h5 className="text-white mb-3">Links Rápidos</h5>
            <Stack gap={2}>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Home</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Compras</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Categorias</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Sobre</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Contato</a>
            </Stack>
          </Col>

          <Col md={3} title="Customer Service" className="text-start">
            <h5 className="text-white mb-3">Serviços</h5>
            <Stack gap={2}>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Política de Entrega</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Trocas e Devoluções</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">SAC</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Termos e Condições</a>
              <a href="#" className="text-light text-decoration-none mb-2 d-inline-block fs-6">Política de Privacidade</a>
            </Stack>
          </Col>

          <Col md={3} title="Contact Info" className="text-start">
            <h5 className="text-white mb-3">Informações de Contato</h5>
            <Stack gap={3}>
              <div className="d-flex align-items-center gap-2 text-light fs-6" style={{ opacity: 0.8 }}>
                <MapPin size={20} />
                <span>234 Commerce, João Pessoa, Brasil</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-light fs-6" style={{ opacity: 0.8 }}>
                <Phone size={20} />
                <span>+55 83 99123-14567</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-light fs-6" style={{ opacity: 0.8 }}>
                <Mail size={20} />
                <span>email@examplo.com</span>
              </div>
            </Stack>
          </Col>
        </Row>

        <div className="border-top border-secondary mt-4 pt-4 text-center text-light fs-6" style={{ opacity: 0.8 }}>
          <p className="mb-0">&copy; {currentYear} Non-Existent Commerce. Todos direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;