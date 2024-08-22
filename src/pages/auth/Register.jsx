import React, { useState } from "react";
import api from "../../api/Api";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });
      console.log("User registered:", response.data);
    } catch (error) {
      console.error("There was an error registering the user!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-login">
      <h3>Registre-se</h3>
      <form onSubmit={handleSubmit}>
        <div className="textfield">
          <label>Nome:</label>
          <input
            placeholder="Digite seu nome..."
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
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
            placeholder="Crie sua senha..."
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        {(loading && <div className="spinner"></div>) || (
          <button type="submit" className="btn-login">
            Criar Conta
          </button>
        )}
        <div>
          <p className="have-account">
            Já possui uma conta? <Link to="/login">Fazer Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
