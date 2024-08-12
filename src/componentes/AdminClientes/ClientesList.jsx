import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiServerLavanderia } from '../../config';
import ClienteCard from './ClienteCard';
import ViewClienteModal from './ViewClienteModal';
import EditClienteModal from './EditClienteModal';
import AddClienteModal from './AddClienteModal';
 // Importar el archivo CSS

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredClientes = clientes.filter(cliente =>
  cliente.nombres.toLowerCase().includes(searchTerm.toLowerCase())
) ;
  
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    axios.get(`${ApiServerLavanderia}api/clientes`)
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
        setError('Error fetching clientes');
      });
  };

  const handleView = (cliente) => {
    setSelectedCliente(cliente);
    setViewModalOpen(true);
  };

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (cliente) => {
    axios.put(`${ApiServerLavanderia}api/clientes/${cliente.idcliente}`, cliente)
      .then(response => {
        setClientes(clientes.map(c => c.idcliente === cliente.idcliente ? cliente : c));
        setEditModalOpen(false);
        setSelectedCliente(null); // Reiniciar el cliente seleccionado
      })
      .catch(error => {
        console.error('Error editing cliente:', error);
        setError('Error editing cliente');
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      axios.patch(`${ApiServerLavanderia}api/clientes/${id}`)
        .then(() => {
          setClientes(clientes.filter(cliente => cliente.idcliente !== id));
        })
        .catch(error => {
          console.error('Error deleting cliente:', error);
          setError('Error deleting cliente');
        });
    }
  };

  const handleAdd = (cliente) => {
    axios.post(`${ApiServerLavanderia}api/clientes`, cliente)
      .then(response => {
        setClientes([...clientes, response.data]);
        setAddModalOpen(false);
      })
      .catch(error => {
        console.error('Error adding cliente:', error);
        setError('Error adding cliente');
      });
  };

  const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
  };


  return (
    <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Lista de Clientes</h1>
      <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar clientes por nombre"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>

      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary mb-3" onClick={() => setAddModalOpen(true)}>Agregar Cliente</button>
      <div className="row">
        {filteredClientes.map(cliente => (
          <ClienteCard
            key={cliente.idcliente}
            cliente={cliente}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {selectedCliente && (
        <ViewClienteModal
          isOpen={viewModalOpen}
          toggle={() => {
            setViewModalOpen(false);
            setSelectedCliente(null); // Reiniciar el cliente seleccionado
          }}
          cliente={selectedCliente}
        />
      )}
      {selectedCliente && (
        <EditClienteModal
          isOpen={editModalOpen}
          toggle={() => {
            setEditModalOpen(false);
            setSelectedCliente(null); // Reiniciar el cliente seleccionado
          }}
          cliente={selectedCliente}
          onSave={handleSaveEdit}
        />
      )}
      <AddClienteModal
        isOpen={addModalOpen}
        toggle={() => setAddModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
};

export default ClientesList;
