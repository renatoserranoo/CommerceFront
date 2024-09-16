import React, { useContext } from "react";
import "./CartItem.css";
import trash from "../../assets/trash.png";
import { CartContext } from "../../contexts/CartContext";
import { Button, Row, Col } from "react-bootstrap";

const CartItem = ({ item }) => {
  const { removeFromCart, addToCart } = useContext(CartContext);

  const handleRemoveItem = () => {
    removeFromCart(item.id);
  };

  const handleDecreaseQuantity = () => {
    if (item.product.quantity > 1) {
      addToCart(item.product.id, item.product.quantity - 3);
    }
  };

  const handleIncreaseQuantity = () => {
    addToCart(item.product.id, 1);
  };

  return (
    <div className="cart-item mb-3 p-3">
      <Row>
        <Col xs={3}>
          <img
            src={item.product.image}
            alt={item.product.title}
            className="cart-item-image img-fluid"
          />
        </Col>
        <Col xs={6} className="cart-item-details">
          <h4>{item.product.title}</h4>
          <p>
            Valor: <b>R${item.product.price.toFixed(2)}</b>
          </p>
        </Col>
        <Col
          xs={3}
          className="custom-quantity d-flex align-items-center justify-content-between"
        >
          <div className="cart-item-quantity d-flex flex-column align-items-center mb-2">
            <p>Quant:</p>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDecreaseQuantity}
                className="me-2 quantity-button"
              >
                <b>-</b>
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleIncreaseQuantity}
                className="ms-2 quantity-button"
              >
                <b>+</b>
              </Button>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleRemoveItem}
            className="d-flex align-items-center justify-content-center"
            style={{ padding: "8px", borderRadius: "50%" }}
          >
            <img src={trash} alt="trash icon" className="trash-icon" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;