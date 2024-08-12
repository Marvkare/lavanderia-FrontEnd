
import React, { useState } from 'react';
import BotonAgregarUsuario from './BotonAgregarUsuario';
// IMPORTAR COMPONENTES
import UsuariosList from './UsuariosList';
const UsuariosMain = () => {
  const [showUserList, setShowUserList] = useState(false);

  const handleShowUserList = () => {
    setShowUserList(true);
  };
  return (
    <div className="App">
     <a>Administrar usuarios</a>
      <BotonAgregarUsuario/> 
      <button className="btn btn-primary" onClick={handleShowUserList}>
        Mostrar Lista de Usuarios
      </button>
      {showUserList && <UsuariosList />}
    </div>
  );
}

export default UsuariosMain;