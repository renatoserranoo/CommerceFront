import { Link } from "react-router-dom";
import "./Card.css";
import cart from "../../assets/cart.png";
import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import api from "../../api/Api";
import ProductActionsDropdown from "./productActions";
import { AuthContext } from "../../contexts/AuthContext";
import BuyModal from "../modal/BuyModal";

export function Card({ id, price, image, title, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const product = { id, price, image, title };

  const handleAddToCart = () => {
    addToCart(id, 1);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/products/${id}`);
      console.log("Product deleted");
      onDelete(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="card">
      {user && user.role === "ADMIN" && (
        <ProductActionsDropdown
          product={product}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}
      <Link to={`/product/${id}`} className="card-link">
        <img src={image} alt={title} className="product-image" />
        <h6>{title}</h6>
        <b>R${price}</b>
      </Link>
      {!user ? (
        <button className="card-button" onClick={showModalHandler}>
          <img src={cart} alt="cart-image" id="cart-image" />
          Comprar
        </button>
      ) : (
        <button className="card-button" onClick={handleAddToCart}>
          <img src={cart} alt="cart-image" id="cart-image" />
          Comprar
        </button>
      )}
      <BuyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={true}
      />
    </div>
  );
}
