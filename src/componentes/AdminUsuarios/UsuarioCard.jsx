import React from 'react';

const UsuarioCard = ({ user, onEdit, onDelete, onProfile }) => {
  return (
    <div className="col-md-5">
      <div className="card mb-5">
        <div className="card-body">

          <p className="card-title" style={{color:"#2471A3"} }><b style={{color:"#000"} }>Nombre Usuario : </b>{user.NombreUsuario}</p>
          <p className="card-text"><b>Nombres : </b>{user.Nombres}</p>
          <p className="card-text"><b>Apellidos : </b>{user.Apellidos}</p>
          <p className="card-text"><b>No. Telefono : </b>{user.NumTelefono}</p>
          <p className="card-text"><b>Estado : </b>{user.EstadoU_idEstadoU}</p>
          <button className="btn btn-primary mr-2" onClick={() => onProfile(user)}>
            Ver Perfil
          </button>
          <button className="btn btn-secondary mr-2" onClick={() => onEdit(user)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(user.idusuario)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioCard;
