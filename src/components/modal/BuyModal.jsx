import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const BuyModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>É necessário fazer login</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você precisa estar logado para adicionar ao carrinho. Deseja fazer login agora?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Não
        </Button>
        <Button as={Link} to={"/login"} variant="primary">
          Sim
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyModal;