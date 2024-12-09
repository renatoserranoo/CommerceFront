import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/Api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCartItems, getCart, setIsLoggedIn } = useContext(CartContext);

  useEffect(() => {
    return () => {
      if (user === null) {
        Cookies.remove("JWT_TOKEN");
      }
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });

      setUser({
        name: response.data.name,
        role: response.data.role,
      });

      setIsLoggedIn(true);
      await getCart();
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      setError("Falha no login. Verifique suas credenciais e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 3;

    window.open(
      "http://localhost:8080/oauth2/authorization/google",
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    window.addEventListener("message", (event) => {
      if (event.origin === "http://localhost:8080") {
        const { success, message, name, role } = event.data;

        setUser({
          name: name,
          role: role,
        });

        if (success) {
          try {
            getCart();
            navigate("/");
          } catch (error) {
            console.error("Erro no login:", message);
            setError(event.data.message);
          }
        }
      }
    });
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await api.post("/user/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      setError("Falha para registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("JWT_TOKEN");
    setCartItems([]);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, googleLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
0;
