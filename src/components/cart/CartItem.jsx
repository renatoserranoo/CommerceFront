import React, { useContext } from "react";
import "./CartItem.css";
import trash from "../../assets/trash.png";
import { CartContext } from "../../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, addToCart } = useContext(CartContext);

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  const handleAddToCart = (e) => {
    addToCart(item.id, e.target.value);
  };

  return (
    <div className="cart-item">
      <img src={item.product.image} alt={item.product.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{item.product.title}</h4>
        <div className="cart-item-quantity">
          <label htmlFor={`quantity-${item.id}`}>Quant: </label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            value={item.quantity}
            min="1"
            onChange={handleAddToCart}
          />
        </div>
        <p>
          Preço:{" "}
          <b>
            R${item.product.price.toFixed(2)}
          </b>
        </p>
        <button className="remove-button" onClick={handleRemoveItem}>
          <img src={trash} alt="trash icon" className="trash-icon" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;