import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Card.css";

function ProductActionsDropdown({ product, handleDeleteProduct }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className="custom-dropdown-toggle"
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              width: "16px",
              height: "12px",
              lineHeight: "1px",
            }}
          >
            ...
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item as={Link} to={`/product-edit/${product.id}`}>
            Editar
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteProduct} style={{ color: "red" }}>
            Deletar
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ProductActionsDropdown;
