import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Auth.css";
import banner from "../../assets/Headphone - Banner.png";
import cartLogo from "../../assets/cartLogo.png";
import Load from "../../components/load/Load";
import { Lock, Mail } from "lucide-react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin, loading, error } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="min-vh-100 m-0">
        <Col
          md={6}
          className="p-0 p-md-5 d-flex flex-column justify-content-center align-items-center text-white"
          style={{ backgroundColor: "#01081d" }}
        >
          <img
            src={cartLogo}
            alt=""
            width={"70%"}
            className="d-block d-md-none"
          />
          <div>
            <img
              className="d-none d-md-block"
              src={banner}
              alt=""
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <div>
            <Card
              className="border-0 bg-transparent w-100"
              style={{ cursor: "auto" }}
            >
              <Card.Body className="py-5 p-md-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">Entrar</h2>
                  <h6 className="text-muted fs-6">
                    Informe os seus dados abaixo para continuar.
                  </h6>
                </div>
                <Form onSubmit={handleSubmit} className="w-100 text-start">
                  <Form.Group className="mb-4 w-100" controlId="formEmail">
                    <Form.Label className="fw-medium fs-5">Email</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <Mail size={18} />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="py-2"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4 w-100" controlId="formPassword">
                    <Form.Label className="fw-medium fs-5">Senha</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <Lock size={18} />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="py-2"
                      />
                    </div>
                  </Form.Group>

                  {loading ? (
                    <Load isLoading={loading} />
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 fw-medium mb-0"
                      size="lg"
                    >
                      Login
                    </Button>
                  )}
                  {error && (
                    <Alert
                      variant="danger"
                      className="w-75 fs-6"
                      style={{
                        position: "absolute",
                        top: "100%",
                      }}
                    >
                      {error}
                    </Alert>
                  )}
                </Form>
                <div className="text-center mt-4 fs-6">
                  <p className="text-muted">
                    Não Possui uma conta?{" "}
                    <Link to={"/register"} className="text-decoration-none">
                      Criar Conta
                    </Link>
                  </p>
                  <Button
                    variant="secondary"
                    type="submit"
                    className="bg-white w-100 py-2 fw-medium mb-4 text-dark"
                    size="lg"
                    onClick={googleLogin}
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      <FcGoogle size={25} />
                      <span className="ms-2">Google</span>
                    </span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
