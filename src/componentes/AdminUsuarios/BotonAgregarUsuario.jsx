import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FormularioUsuarioModal from './FormularioUsuarioModal';

const BotonAgregarUsuario = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Agregar Usuario
      </Button>

      <FormularioUsuarioModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default BotonAgregarUsuario;
