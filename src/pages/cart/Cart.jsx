import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import CartItem from "../../components/cart/CartItem";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h3>Meu Carrinho</h3>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Seu carrinho está vazio.</p>
        </div>
      ) : (
        <>
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="cart-total">
              <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
              <Link to="/payment">
                <button className="checkout-button">Finalizar Compra</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
