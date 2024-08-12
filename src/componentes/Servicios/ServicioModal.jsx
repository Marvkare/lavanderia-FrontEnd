import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ServicoModal = ({ pedido }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Button variant="outline-primary" onClick={handleShow}>
        {pedido.nombre} - {pedido.fecha}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID: {pedido.id}</p>
          <p>Nombre: {pedido.nombre}</p>
          <p>Fecha: {pedido.fecha}</p>
          <p>Descripción: {pedido.descripcion}</p>
          {/* Agrega más detalles del pedido aquí */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServicioModal;
