import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import lupa from "../../assets/lupa.png";
import cart from "../../assets/cart.png";
import { CartContext } from "../../contexts/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="header">
      <nav className="navbar">
        <p>
          <a href="/">Commerce</a>
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Buscar produto..." />
          <button>
            <img src={lupa} alt="" id="search-img" />
          </button>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Categorias</Link>
          </li>
          <li>
            <Link to="/payment">Pix</Link>
          </li>
        </ul>
        <Link to="/cart" className="navbar-cart">
          <button className="cart-button">
            <img src={cart} alt="" id="cart-nav" />
            {totalItems > 0 ? (
              <span className="total-items">{totalItems}</span>
            ) : null}
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
