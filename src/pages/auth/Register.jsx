import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import Load from "../../components/load/Load";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading, error } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await register(name, email, password);
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
            required
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
            required
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
            required
          />
        </div>
        {loading ? (
          <Load isLoading={loading} />
        ) : (
          <button type="submit" className="btn-login">
            Criar Conta
          </button>
        )}
        <div style={{ width: "100%"}}>
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{
                width: "100%",
                fontSize: "13px",
                fontWeight: "bold",
                padding: "0",
                backgroundColor: "inherit",
                border: "0",
                color: "#ff4d4d",
              }}
            >
              {error}
            </div>
          )}
          <p className="have-account">
            Já possui uma conta? <Link to="/login">Fazer Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
