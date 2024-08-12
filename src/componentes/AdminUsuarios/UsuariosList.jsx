import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiServerLavanderia } from '../../config';
// Componentes
import UsuarioCard from './UsuarioCard';
import EditUsuarioModal from './EditUsuarioModal';
import UsuarioPerfilModal from './UsuarioPerfilModal';

const UsuariosList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('1');
  const [roles, setOpcionesSelectRoles] = useState([]);
  const [estados, setOpcionesSelectEstadoU] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch users from API
    axios.get(ApiServerLavanderia + 'api/usuario', {
      headers: {
        'x-access-token': token
      }
    })
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      setError(error.response ? error.response.data.message : 'Error fetching users');
      console.error('Error fetching users:', error);
    });

    // Fetch options for the first select
    axios.get(ApiServerLavanderia + 'api/usuario/rolestado', {
      headers: {
        'x-access-token': token
      }
    })
    .then(response => {
      console.log(response.data[1])
      setOpcionesSelectRoles(response.data[0]);
      setOpcionesSelectEstadoU(response.data[1]);
    })
    .catch(error => {
      setError(error.response ? error.response.data.message : 'Error fetching options');
      console.error('Error fetching opciones:', error);
    });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleProfile = (user) => {
    setSelectedUser(user);
    setProfileModalOpen(true);
  };

  const handleDelete = (userId) => {
    const token = localStorage.getItem('token');
    
    axios.patch(ApiServerLavanderia + `api/usuario/baja/${userId}`, {}, {
      headers: {
        'x-access-token': token
      }
    })
    .then(() => {
      setUsers(users.filter(user => user.idusuario !== userId));
    })
    .catch(error => {
      setError(error.response ? error.response.data.message : 'Error deleting user');
      console.error('Error deleting user:', error);
    });
  };

  const filteredUsers = users.filter(user => {
    if (filterOption === '2' && selectedRole) {
      return user.Roles_idRoles === selectedRole;
    }
    if (filterOption === '3' && selectedEstado) {
      return user.EstadoU_idEstadoU === selectedEstado;
    }
    return true;
  }).filter(user => {
    return (
      user.Nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.NombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <h1>Lista de Usuarios</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuarios por nombre, apellido o nombre de usuario"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {filteredUsers.map(user => (
          <UsuarioCard
            key={user.idusuario}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onProfile={handleProfile}
          />
        ))}
      </div>
      {selectedUser && (
        <EditUsuarioModal
          user={selectedUser}
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={(updatedUser) => {
            setUsers(users.map(user => (user.idusuario === updatedUser.idusuario ? updatedUser : user)));
            setEditModalOpen(false);
          }}
        />
      )}
      {selectedUser && (
        <UsuarioPerfilModal
          user={selectedUser}
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UsuariosList;
