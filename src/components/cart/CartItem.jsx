import React, { useContext } from "react";
import "./CartItem.css";
import trash from "../../assets/trash.png";
import { CartContext } from "../../contexts/CartContext";
import { Button, Row, Col, Image, Stack } from "react-bootstrap";

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
    <Stack direction="horizontal" gap={3} className="border-bottom pb-3 mb-3">
      <Image
        src={item.product.image}
        alt={item.product.title}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="me-auto text-start">
        <h5>{item.product.title}</h5>
        <p className="mb-1 fs-5">R${item.product.price}</p>
        <div className="d-flex align-items-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDecreaseQuantity}
            className="me-1 quantity-button"
          >
            <b>-</b>
          </Button>
          <span className="fs-5">{item.quantity}</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleIncreaseQuantity}
            className="ms-1 quantity-button"
          >
            <b>+</b>
          </Button>
        </div>
      </div>
      <div className="text-end d-flex flex-column align-items-end gap-2">
        <Button
          variant="danger"
          size="sm"
          onClick={handleRemoveItem}
          className="d-flex align-items-center justify-content-center"
          style={{ padding: "5px", borderRadius: "8px" }}
        >
          <img src={trash} alt="trash icon" className="trash-icon" />
        </Button>
        <p className="mb-1 fw-bold fs-5">
          R${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </Stack>
  );
};

export default CartItem;
