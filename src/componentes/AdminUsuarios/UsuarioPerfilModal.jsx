import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const UsuarioPerfilModal = ({ isOpen, onClose, user }) => {
  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Perfil del Usuario</ModalHeader>
      <ModalBody>
          <p className="card-title"><b>Nombre Usuario : </b>{user.NombreUsuario}</p>
          <p className="card-text"><b>Nombres : </b>{user.Nombres}</p>
          <p className="card-text"><b>Apellidos : </b>{user.Apellidos}</p>
          <p className="card-text"><b>No. Telefono : </b>{user.NumTelefono}</p>
          <p className="card-text"><b>CURP : </b>{user.CURP}</p>
          <p className="card-text"><b>RFC : </b>{user.RFC}</p>
          <p className="card-text"><b>Contraseña: </b>{user.Contrasena}</p>
          <p className="card-text"><b>Rol : </b>{user.Roles_idRoles}</p>
          <p className="card-text"><b>EstadoU_idEstadoU: </b>{user.EstadoU_idEstadoU}</p>
          <p className="card-text"><b>Fecha de creacion: </b>{user.FechaCreacion}</p>

        {/* Agrega más campos de información del usuario si es necesario */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UsuarioPerfilModal;
