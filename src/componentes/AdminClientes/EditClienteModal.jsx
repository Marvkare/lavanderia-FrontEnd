import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditClienteModal = ({ isOpen, toggle, cliente, onSave }) => {
  const [formData, setFormData] = useState(cliente);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Editar Cliente</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nombres">Nombres</Label>
            <Input type="text" name="nombres" id="nombres" value={formData.nombres} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="apellidos">Apellidos</Label>
            <Input type="text" name="apellidos" id="apellidos" value={formData.apellidos} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="noTelefono">Teléfono</Label>
            <Input type="text" name="noTelefono" id="noTelefono" value={formData.noTelefono} onChange={handleChange} required />
          </FormGroup>
          <Button color="primary" type="submit">Guardar</Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditClienteModal;
