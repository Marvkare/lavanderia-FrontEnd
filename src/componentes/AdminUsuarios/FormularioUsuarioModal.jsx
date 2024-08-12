import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {ApiServerLavanderia} from '../../config.js'
const FormularioUsuarioModal = ({ show, handleClose }) => {
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [NumTelefono, setNumeroTelefono] = useState('');
  const [CURP, setCurp] = useState('');
  const [RFC, setRfc] = useState('');
  const [NombreUsuario, setNombreUsuario] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [opcionesSelectRoles, setOpcionesSelectRoles] = useState([]);
  const [opcionesSelectEstadoU, setOpcionesSelectEstadoU] = useState([]);
  const [EstadoU_idEstadoU, setSelectedOptionEstadoU] = useState('');
  const [Rol_idRol, setSelectedOptionRol] = useState('');

  useEffect(() => {
    // Fetch options for the first select
     axios.get(ApiServerLavanderia+'api/usuario/rolestado')
      .then(response => {
        console.log(response.data[1])
        setOpcionesSelectRoles(response.data[0])
        setOpcionesSelectEstadoU(response.data[1])
      })
      .catch(error => console.error('Error fetching opciones1:', error));

      
    /*
    // Fetch options for the second select
    axios.get('http://YOUR_API_IP/opciones2')
      .then(response => setOpcionesSelect2(response.data))
      .catch(error => console.error('Error fetching opciones2:', error));*/
  }, []);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevoUsuario = {
      Nombres,
      Apellidos,
      NumTelefono,
      NombreUsuario,
      Contrasena,
      Rol_idRol,
      CURP,
      RFC,
      EstadoU_idEstadoU,
      
    };
    console.log(nuevoUsuario)
    const token = localStorage.getItem('token')
    axios.post(ApiServerLavanderia+"api/usuario/agregar",nuevoUsuario,{headers: { 
      'Content-Type': 'application/json', 
    'x-access-token': token
    }} )
      .then(response => {
        console.log('Usuario agregado:', response.data);
        handleClose();
      })
      .catch(error => console.error('Error adding usuario:', error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombres">
            <Form.Label>Nombres</Form.Label>
            <Form.Control type="text" value={Nombres} onChange={e => setNombres(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="apellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" value={Apellidos} onChange={e => setApellidos(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="numeroTelefono">
            <Form.Label>Número de Teléfono</Form.Label>
            <Form.Control type="text" value={NumTelefono} onChange={e => setNumeroTelefono(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="curp">
            <Form.Label>CURP</Form.Label>
            <Form.Control type="text" value={CURP} onChange={e => setCurp(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="rfc">
            <Form.Label>RFC</Form.Label>
            <Form.Control type="text" value={RFC} onChange={e => setRfc(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="nombreUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" value={NombreUsuario} onChange={e => setNombreUsuario(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={Contrasena} onChange={e => setContrasena(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="select1">
            <Form.Label>Seleccione el estado del nuevo usuario</Form.Label>
            <Form.Control as="select" value={EstadoU_idEstadoU} onChange={e => {
              console.log(e.target.value)
              setSelectedOptionEstadoU(e.target.value)}} required>
              <option value="">Seleccione </option>
              {opcionesSelectEstadoU.map(opcion => (
                
                <option key={opcion.idEstadoU} value={opcion.idEstadoU}>{opcion.Nombre}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="select2">
            <Form.Label>Seleccionar Opción 2</Form.Label>
            <Form.Control as="select" value={Rol_idRol} onChange={e => {
              console.log(e.target.value)
              setSelectedOptionRol(e.target.value)}} required>
              <option value="">Seleccione rol del nuevo usuario</option>
              {opcionesSelectRoles.map(opcion => (
                
                <option key={opcion.idRoles} value={opcion.idRoles}>{opcion.Nombre}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Agregar Usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioUsuarioModal;
