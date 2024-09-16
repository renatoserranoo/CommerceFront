import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/Api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Cookies from 'js-cookie';

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
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
0;
