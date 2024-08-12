import React, { useState , useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { ApiServerLavanderia } from '../../config';


const EditUsuarioModal = ({ isOpen, onClose, user, onSave }) => {
  
  
  const [Nombres, setName] = useState(user.Nombres);
  const [Apellidos, setDescription] = useState(user.Apellidos);
  const [NumTelefono,setNumeroTelefono] = useState(user.NumTelefono);
  const [CURP,setCURP] = useState(user.CURP);
  const [RFC, setRFC] = useState(user.RFC)
  const [NombreUsuario, setNombreUsuario] = useState(user.NombreUsuario)
  const [Contrasena, setContrasena] = useState(user.Contrasena)
  const [Roles_idRoles, setRoles_idRoles] = useState(user.Roles_idRoles)
  const [EstadoUsuario,setEstadoUsuario]= useState(user.EstadoU_idEstadoU)
  const [RolUsuario, setRolUsuario] = useState(user.Rol_idRol)
  const [FechaCreacion, setFechaCreacion] = useState(user.FechaCreacion)
  const [opcionesSelectRoles, setOpcionesSelectRoles] = useState([]);
  const [opcionesSelectEstadoU, setOpcionesSelectEstadoU] = useState([]);
  const [EstadoU_idEstadoU, setSelectedOptionEstadoU] = useState('');
  const [Rol_idRol, setSelectedOptionRol] = useState('');
  useEffect(() => {
    
    // Fetch options for the first select
     axios.get(ApiServerLavanderia+'api/usuario/rolestado')
      .then(response => {
        console.log(response.data[0])
        setOpcionesSelectRoles(response.data[0])
        setOpcionesSelectEstadoU(response.data[1])
        console.log("se obtuvo data")
      })
      .catch(error => console.error('Error fetching opciones1:', error));

    if (user) {
      setName(user.Nombres);
      setDescription(user.Apellidos);
      setNumeroTelefono(user.NumTelefono)
      setCURP(user.CURP)
      setRFC(user.RFC)
      setNombreUsuario(user.NombreUsuario)
      setContrasena(user.Contrasena)
      setRoles_idRoles(user.Roles_idRoles)
      setEstadoUsuario(user.EstadoU_idEstadoU)
      setFechaCreacion(user.FechaCreacion)
      setRolUsuario(user.Rol_idRol)
      setSelectedOptionEstadoU(user.EstadoU_idEstadoU)
      setSelectedOptionRol(user.Roles_idRoles)
    }
  }, [user]);

  console.log(user.Nombres)
  const handleSave = () => {
    const updatedUser = { ...user, Nombres, Apellidos, NumTelefono, CURP, RFC, NombreUsuario, Contrasena, Roles_idRoles, EstadoU_idEstadoU, FechaCreacion };
    console.log(updatedUser)
    // Update user in API
    axios.patch(ApiServerLavanderia+`api/usuario/${user.idusuario}`, updatedUser)
      .then(response => {
        onSave(response.data);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Editar Usuario</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input
              type="text"
              id="name"
              value={Nombres}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Apellidos</Label>
            <Input
              type="text"
              id="description"
              value={Apellidos}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Nombre usuario</Label>
            <Input
              type="text"
              id="description"
              value={NombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">CURP</Label>
            <Input
              type="text"
              id="description"
              value={CURP}
              onChange={(e) => setCURP(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">RFC</Label>
            <Input
              type="text"
              id="description"
              value={RFC}
              onChange={(e) => setRFC(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Fecha de creacion</Label>
            <Input
              type="text"
              id="description"
              value={FechaCreacion}
              onChange={(e) => setFechaCreacion(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Numero de telefono</Label>
            <Input
              type="text"
              id="description"
              value={NumTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
        <Label for="select1">Seleccione el estado de: {user.Nombres}</Label>
        <Input
          type="select"
          id="select1"
          value={EstadoU_idEstadoU}
          onChange={e => {
            
            setSelectedOptionEstadoU(e.target.value);
          }}
          required
        >
          <option value="">Seleccione</option>
          {opcionesSelectEstadoU.map(opcion => (
            <option key={opcion.idEstadoU} value={opcion.idEstadoU}>
              {opcion.Nombre}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="select1">Seleccione el rol de: {user.Nombres}</Label>
        <Input
          type="select"
          id="select1"
          value={Rol_idRol}
          onChange={e => {
            
            setSelectedOptionRol(e.target.value);
          }}
          required
        >
          <option value="">Seleccione</option>
          {opcionesSelectRoles.map(opcion => (
            <option key={opcion.idRoles} value={opcion.idRoles}>
              {opcion.Nombre}
            </option>
          ))}
        </Input>
      </FormGroup> 
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>Guardar</Button>
        <Button color="secondary" onClick={onClose}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditUsuarioModal;
