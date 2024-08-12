import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ViewClienteModal = ({ isOpen, toggle, cliente }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Detalles del Cliente</ModalHeader>
      <ModalBody>
        <p>Nombres: {cliente.nombres}</p>
        <p>Apellidos: {cliente.apellidos}</p>
        <p>Teléfono: {cliente.noTelefono}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ViewClienteModal;
