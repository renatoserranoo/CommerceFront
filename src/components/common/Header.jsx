import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown, Button, Offcanvas } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./Header.css";
import cart from "../../assets/cart.png";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import SearchBar from "../searchBar/SearchBar";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false); // Estado para controlar a visibilidade do Offcanvas

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="header">
      <Navbar className="navbar-custom" expand="lg">
        <Navbar.Brand as={Link} to="/" className="d-none d-lg-block">
          Commerce
        </Navbar.Brand>
        <div className="d-flex align-items-center justify-content-between d-lg-none w-100">
          <Button variant="link" className="me-4" onClick={handleShow} style={{ color: "white"}}>
            <FaBars size={24} />
          </Button>
          <Navbar.Brand as={Link} to="/" className="mx-auto">
            Commerce
          </Navbar.Brand>
          <Nav.Link as={Link} to="/cart" className="navbar-cart ms-4">
            <button className="cart-button">
              <img src={cart} alt="" id="cart-nav" />
              {totalItems > 0 && (
                <span className="total-items">{totalItems}</span>
              )}
            </button>
          </Nav.Link>
        </div>
        <SearchBar />

        <Nav className="ml-auto d-none d-lg-flex">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-categories"
              className="dropdown-toggle-custom"
            >
              Categorias
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item as={Link} to="/category/tech">
                Eletrônicos
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/category/fashion">
                Moda
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/category/home">
                Casa
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/category/book">
                Livros
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {user ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-categories"
                className="dropdown-toggle-custom"
                style={{ fontSize: "14px" }}
              >
                Bem vindo,
                <br /> {user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-custom">
                <Dropdown.Item as={Link} to="/">
                  Minha Conta
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/" onClick={handleLogout}>
                  Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav style={{ flexDirection: "column" }}>
              <span style={{ display: "flex" }}>
                <Nav.Item as={Link} to="/login" style={{ fontSize: "13px" }}>
                  Login
                </Nav.Item>
                <p style={{ fontSize: "13px", marginInline: "5px" }}>ou</p>
              </span>
              <Nav.Item as={Link} to="/register" style={{ fontSize: "13px" }}>
                Registre-se
              </Nav.Item>
            </Nav>
          )}

          <Nav.Link
            as={Link}
            to="/cart"
            className="navbar-cart d-none d-lg-block"
          >
            <button className="cart-button">
              <img src={cart} alt="" id="cart-nav" />
              {totalItems > 0 ? (
                <span className="total-items">{totalItems}</span>
              ) : null}
            </button>
          </Nav.Link>

          {user && user.role === "ADMIN" && (
            <Button
              as={Link}
              to="/product-edit"
              variant="primary"
              className="add-product-button"
            >
              <span>
                <b>+</b>
              </span>
            </Button>
          )}
        </Nav>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          className="offcanvas-custom"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="offcanvas-custom-item flex-column">
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>

              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-categories"
                  className="dropdown-toggle-custom"
                >
                  Categorias
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-custom">
                  <Dropdown.Item
                    as={Link}
                    to="/category/tech"
                    onClick={handleClose}
                  >
                    Eletrônicos
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/category/fashion"
                    onClick={handleClose}
                  >
                    Moda
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/category/home"
                    onClick={handleClose}
                  >
                    Casa
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/category/book"
                    onClick={handleClose}
                  >
                    Livros
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {user ? (
                <>
                  <Nav.Link as={Link} to="/" onClick={handleClose}>
                    Minha Conta
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    Sair
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" onClick={handleClose}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" onClick={handleClose}>
                    Registre-se
                  </Nav.Link>
                </>
              )}
              {user && user.role === "ADMIN" && (
                <Button
                  as={Link}
                  to="/product-edit"
                  variant="primary"
                >
                  <span>
                    <b>+ Adicionar produto</b>
                  </span>
                </Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    </div>
  );
};

export default Header;
