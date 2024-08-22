import React, { useContext, useState } from "react";
import api from "../../api/Api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { CartContext } from "../../contexts/CartContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { getCart } = useContext(CartContext); // Remover e colocar no auth context

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    localStorage.removeItem("token");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      console.log("User Logged in:", response.data);
      await getCart();
      navigate("/");
    } catch (error) {
      console.error("There was an error logging the user!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);

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

    setLoading(false);
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
          />
        </div>
        {(loading && <div className="spinner"></div>) || (
          <button type="submit" className="btn-login">
            Login
          </button>
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
