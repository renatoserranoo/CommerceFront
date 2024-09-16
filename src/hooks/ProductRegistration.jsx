import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../api/Api";

const ProductRegistration = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const categories = [
    { id: "1", name: "Eletrônicos" },
    { id: "2", name: "Moda" },
    { id: "3", name: "Casa" },
    { id: "4", name: "Livros" },
  ];

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          setProduct(response.data);
          setIsEditMode(true);
        } catch (error) {
          console.error("Failed to fetch the product", error);
          setMessage("Falha ao carregar o produto.");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const updatedProduct = { ...product, id: parseInt(id) };
        await api.put("/products", updatedProduct);
        setMessage("Produto atualizado com sucesso!");
      } else {
        await api.post("/products", product);
        setMessage("Produto criado com sucesso!");
      }
    } catch (error) {
      console.error("Failed to create/update the product", error);
      setMessage("Falha para criar/atualizar produto.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Container style={{ height: "85vh", margin: "160px 0 8% 0"}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>{isEditMode ? "Editar Produto" : "Cadastrar Produto"}</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="formTitle"
              className="form-group w-75 mb-3 text-start"
            >
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Digite o título do produto..."
                value={product.title}
                onChange={handleInputChange}
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group
              controlId="formPrice"
              className="form-group w-75 mb-3 text-start"
            >
              <Form.Label>Preço:</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Digite o preço do produto..."
                value={product.price}
                onChange={handleInputChange}
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group
              controlId="formDescription"
              className="form-group w-75 mb-3 text-start"
            >
              <Form.Label>Descrição:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Digite a descrição do produto"
                value={product.description}
                onChange={handleInputChange}
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group
              controlId="formImage"
              className="form-group w-75 mb-4 text-start"
            >
              <Form.Label>URL da Imagem:</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Coloque o URL da imagem..."
                value={product.image}
                onChange={handleInputChange}
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group
              controlId="formCategory"
              className="form-group w-75 mb-3 text-start"
            >
              <Form.Label>Categoria:</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="form-control-lg"
                style={{ cursor: "pointer" }}
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mb-4 w-50"
              style={{ padding: "10px 12px" }}
            >
              <b>{isEditMode ? "Atualizar Produto" : "+ Adicionar Produto"}</b>
            </Button>
            {message && (
              <Alert
                variant={message.includes("sucesso") ? "success" : "danger"}
                style={{ width: "75%", fontSize: "16px" }}
              >
                {message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductRegistration;
