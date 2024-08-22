import { Link } from "react-router-dom";
import "./Card.css";
import cart from "../../assets/cart.png";
import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Card({ id, price, image, title }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const product = { id, price, image, title };
    addToCart(id, 1);
  };

  return (
    <div className="card">
      <Link to={`/product/${id}`} className="card-link">
        <img src={image} alt={title} className="product-image" />
        <h6>{title}</h6>
        <b>R${price}</b>
      </Link>
      <button className="card-button" onClick={handleAddToCart}>
        <img src={cart} alt="cart-image" id="cart-image" />
        Comprar
      </button>
    </div>
  );
}
