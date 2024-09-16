import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={styles.footer} className="footer">
      <Container fluid style={styles.container}>
        <Row>
          <Col className="text-center p-0">
            <p style={styles.text}>
              © 2024 Commerce. Todos os direitos reservados.
            </p>
            <div style={styles.links}>
              <a href="/privacy" style={styles.link}>
                Política de Privacidade
              </a>{" "}
              |
              <a href="/terms" style={styles.link}>
                {" "}
                Termos de Uso
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const styles = {
  footer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#151515",
    color: "#cab49b",
    marginTop: "auto",
    width: '100%',
    height: "300px",
  },
  container: {
    padding: 0,
    width: '98%',
  },
  text: {
    padding: 0,
    margin: 0,
  },
  links: {
    marginTop: "10px",
  },
  link: {
    color: "#cab49b",
    margin: "0 10px",
    textDecoration: "none",
  },
};

export default Footer;
