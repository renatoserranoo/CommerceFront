import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Auth.css";
import Load from "../../components/load/Load";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais e tente novamente.");
    }
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;

    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 3;

    const googleLoginUrl = "http://localhost:8080/oauth2/authorization/google";

    window.open(
      googleLoginUrl,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <div className="card-login">
      <h3>Fazer Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="textfield">
          <label>Email:</label>
          <input
            placeholder="Digite seu email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="textfield">
          <label>Senha:</label>
          <input
            placeholder="Digite sua senha..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        {loading ? (
          <Load isLoading={loading} />
        ) : (
          <button type="submit" className="btn-login">
            Login
          </button>
        )}
        {error && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{
              width: "100%",
              fontSize: "13px",
              fontWeight: "bold",
              padding: "0",
              margin: "0",
              backgroundColor: "inherit",
              border: "0",
              color: "#ff4d4d",
            }}
          >
            {error}
          </div>
        )}
        <hr style={{ width: "100%" }} />
        <button
          type="button"
          className="btn-google-login"
          id="customBtn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className="icon"></span>
          <span className="buttonText">Login com Google</span>
        </button>
        <p className="have-account">
          Não possui uma conta? <Link to="/register">Criar Conta</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
