import "./ProductPage.css";
import useDataProducts from "../../hooks/useDataProducts";
import cart from "../../assets/cart.png";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Load from "../../components/load/Load";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const ProductPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useDataProducts(id);
  const { addToCart } = useContext(CartContext);

  if (loading) {
    return (
      <div className="load-home">
        <Load isLoading={loading} />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <Container
      className="product-container d-flex align-items-center justify-content-center py-4"
      style={{ minHeight: "90vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={6}>
          <h2 className="d-block d-md-none mb-3">{product.title}</h2>
          <Card className="w-100 mb-3 border" style={{ cursor: "auto" }}>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{ width: "350px", height: "auto" }}
            />
          </Card>
        </Col>
        <Col xs={12} md={6} className="text-start">
          <h2 className="d-none d-md-block m-3">{product.title}</h2>
          <Card className="w-100 border" style={{ cursor: "auto" }}>
            <Card.Body>
              <ListGroup variant="flush" className="w-100">
                <ListGroup.Item className="text-start">
                  <h3 className="text-primary mb-0">R${product.price}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="text-start">
                  <h5>Descrição</h5>
                  <p className="fs-6">{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
              <div className="d-grid gap-2 mt-3">
                <Button variant="primary" size="lg" onClick={handleAddToCart}>
                  <img src={cart} alt="cart-image" id="cart-image" />
                  Comprar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
