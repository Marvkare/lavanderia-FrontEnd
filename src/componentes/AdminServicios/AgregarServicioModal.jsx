import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Col, Row, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ApiServerLavanderia } from '../../config';

const AgregarServicioModal = ({ show, handleClose }) => {
  const [clientes, setClientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombresCliente, setnombresCliente] = useState('');
  const [apellidosCliente, setApellidosCliente] = useState(''); 
  const [telefonoCliente, setTelefonoCliente] = useState(''); // Estado para el número de teléfono
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedFechaEntrega, setSelectedFechaEntrega] = useState(new Date());
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${ApiServerLavanderia}api/clientes`);
        console.log(response.data)
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${ApiServerLavanderia}api/servicios/categorias`);
        console.log(response.data[0])
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchClientes();
    fetchCategorias();
  }, [show]);

  const handlenombresClienteChange = (e) => {
    const nombres = e.target.value;
    setnombresCliente(nombres);

    const filtered = clientes.filter(cliente =>
      cliente.nombres.toLowerCase().includes(nombres.toLowerCase())
    );
    setFilteredClientes(filtered);

    const clienteExistente = clientes.find(cliente => cliente.nombres.toLowerCase() === nombres.toLowerCase());
    console.log(clienteExistente)
    if (clienteExistente) {
      setSelectedCliente(clienteExistente);
      setTelefonoCliente(clienteExistente.noTelefono);
      setApellidosCliente(clienteExistente.apellidos);
      setnombresCliente(clienteExistente.Nombres);
    } else {
      setSelectedCliente(null);
      setTelefonoCliente('');
      setApellidosCliente('');
    }
  };

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
    setnombresCliente(cliente.nombres);
    setApellidosCliente(cliente.apellidos);
    setTelefonoCliente(cliente.noTelefono);
    setFilteredClientes([]); 
  };

  const handleAgregarCliente = async () => {
    try {
      const response = await axios.post(`${ApiServerLavanderia}api/clientes`, {
        nombres: nombresCliente,
        apellidos: apellidosCliente,
        telefono: telefonoCliente 
      });
      setSelectedCliente(response.data);
      alert('Cliente agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const handleAgregarServicio = async () => {
    if (!selectedCliente) {
      alert('Debe seleccionar o agregar un cliente');
      return;
    }

    try {
      const response = await axios.post(`${ApiServerLavanderia}api/servicios/agregar`, {
        nombreServicio: descripcion,
        descripcion: descripcion,
        precio: 0.0,
        fechaCreacion: new Date().toISOString(),
        fechaEntrega: selectedFechaEntrega.toISOString(),
        cliente_idcliente: selectedCliente.idcliente,
        cantidad,
        usuario_idusuario: 1, 
        categoria_servicio_idcategoria_servicio: selectedCategoria,
        estado_servicio_idestado_servicio: 1
      });
      alert('Servicio agregado exitosamente');
      handleClose(); 
    } catch (error) {
      console.error('Error al agregar servicio:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formnombresCliente">
            <Form.Label column sm="4">Nombres del Cliente:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={nombresCliente}
                onChange={handlenombresClienteChange}
              />
              {filteredClientes.length > 0 && (
                <Dropdown.Menu show>
                  {filteredClientes.map((cliente) => (
                    <Dropdown.Item key={cliente.idcliente} onClick={() => handleSelectCliente(cliente)}>
                      {cliente.nombres} {cliente.apellidos}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formApellidosCliente">
            <Form.Label column sm="4">Apellidos del Cliente:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={apellidosCliente ||''}
                onChange={(e) => setApellidosCliente(e.target.value)}
                disabled={!!selectedCliente} 
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formTelefonoCliente">
            <Form.Label column sm="4">Teléfono del Cliente:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={telefonoCliente || ''}
                onChange={(e) => setTelefonoCliente(e.target.value)}
                disabled={!!selectedCliente} 
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formFechaEntrega">
            <Form.Label column sm="4">Fecha de Entrega:</Form.Label>
            <Col sm="8">
              <DatePicker
                selected={selectedFechaEntrega || ''}
                onChange={(date) => setSelectedFechaEntrega(date)}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formCategoriaServicio">
            <Form.Label column sm="4">Categoría del Servicio:</Form.Label>
            <Col sm="8">
              <Form.Select
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.idcategoria_servicio} value={categoria.idcategoria_servicio}>
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formDescripcion">
            <Form.Label column sm="4">Descripción del Servicio:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formCantidad">
            <Form.Label column sm="4">Cantidad:</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleAgregarServicio}>Agregar Servicio</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgregarServicioModal;
