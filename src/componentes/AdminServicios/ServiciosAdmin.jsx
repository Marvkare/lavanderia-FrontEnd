import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AgregarServicioModal from './AgregarServicioModal';
import ServiciosList from './ServiciosList';
const ServiciosAdmin = ( ) => {

    const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

  return (
   
      <>
      <h1>Lista de servicios</h1>

      <Button variant="primary" onClick={handleShowModal}>Agregar Servicio</Button>
      <AgregarServicioModal show={modalShow} handleClose={handleCloseModal} />
      <ServiciosList/>
      </>
  );
};

export default ServiciosAdmin;