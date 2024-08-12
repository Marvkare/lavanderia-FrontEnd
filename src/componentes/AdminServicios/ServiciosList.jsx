import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Dropdown } from 'react-bootstrap';

import { ApiServerLavanderia } from '../../config';

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState(null);
  const [razonCancelacion, setRazonCancelacion] = useState('');

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`${ApiServerLavanderia}api/servicios`);
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios activos:', error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await axios.get(`${ApiServerLavanderia}api/servicios/estados`);
        setEstados(response.data);
      } catch (error) {
        console.error('Error al obtener los estados:', error);
      }
    };

    fetchServicios();
    fetchEstados();
  }, []);

  const handleOpenModal = (servicio) => {
    setSelectedServicio(servicio);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedServicio(null);
  };

 const handleChangeEstado = async () => {
  try {
    await axios.post(`${ApiServerLavanderia}api/servicios/cambiar-estado`, {
      idServicio: selectedServicio.idServicio,
      estado_servicio_idestado_servicio: nuevoEstado,
    });

    // Find the new state name based on the selected new state ID
    const nuevoEstadoNombre = estados.find(e => e.idestado_servicio === parseInt(nuevoEstado))?.nombreEstadoS;

    // Update the service list with the new state name
    setServicios(servicios.map(servicio =>
      servicio.idServicio === selectedServicio.idServicio
        ? { ...servicio, estadoServicio: nuevoEstadoNombre }
        : servicio
    ));

    handleCloseModal();
  } catch (error) {
    console.error('Error al cambiar el estado del servicio:', error);
  }
};


  const handleCancelService = async () => {
    try {
      await axios.post(`${ApiServerLavanderia}api/servicios/cancelar`, {
        idServicio: selectedServicio.idServicio,
        razon_cancelacion: razonCancelacion,
      });

      // Optional: update the services list or handle it as needed

      handleCloseModal();
    } catch (error) {
      console.error('Error al cancelar el servicio:', error);
    }
  };

  return (
    <div>
      <h3>Servicios Activos</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre del Servicio</th>
            <th>Fecha de Entrega</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Nombre del Cliente</th>
            <th>Apellidos del Cliente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.idServicio}>
              <td>{servicio.nombreServicio}</td>
              <td>{new Date(servicio.fechaEntrega).toLocaleString()}</td>
              <td>{servicio.cantidad}</td>
              <td>{servicio.Precio}</td>
              <td>{servicio.nombreCliente}</td>
              <td>{servicio.apellidosCliente}</td>
              <td>
                <Button onClick={() => handleOpenModal(servicio)}>
                  {servicio.estadoServicio}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Estado del Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown onSelect={(eventKey) => setNuevoEstado(eventKey)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {estados.find(e => e.idestado_servicio === nuevoEstado)?.nombreEstadoS || 'Seleccionar Estado'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {estados.map((estado) => (
                <Dropdown.Item key={estado.idestado_servicio} eventKey={estado.idestado_servicio}>
                  {estado.nombreEstadoS}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <textarea
            placeholder="Razón de la cancelación (si aplica)"
            value={razonCancelacion}
            onChange={(e) => setRazonCancelacion(e.target.value)}
            style={{ width: '100%', marginTop: '10px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleChangeEstado}>
            Guardar Cambios
          </Button>
          <Button variant="danger" onClick={handleCancelService}>
            Cancelar Servicio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiciosList;
