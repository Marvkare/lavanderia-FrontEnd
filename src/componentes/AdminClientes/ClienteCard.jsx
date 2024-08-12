import React from 'react';

const ClienteCard = ({ cliente, onView, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{cliente.nombres} {cliente.apellidos}</h5>
        <p className="card-text">Teléfono: {cliente.noTelefono}</p>
        <button onClick={() => onView(cliente)} className="btn btn-info mr-2">Ver</button>
        <button onClick={() => onEdit(cliente)} className="btn btn-warning mr-2">Editar</button>
        <button onClick={() => onDelete(cliente.idcliente)} className="btn btn-danger">Eliminar</button>
      </div>
    </div>
  );
};

export default ClienteCard;
