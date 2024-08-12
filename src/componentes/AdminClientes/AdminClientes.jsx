
import React, { useState } from 'react';
// IMPORTAR COMPONENTES
import ClientesList from './ClientesList';
import SideBarMenu from '../Principal/SideBarMenu';
const AdminClientes = () => {
  const [showClientesList, setShowClientesList] = useState(false);

  const handleShowClientesList = () => {
    setShowUserList(true);
  };
  return (
    <div className="App">
        <SideBarMenu/>
     <a>Admin Clientes</a>
      
       <ClientesList />
      
    </div>
  );
}

export default AdminClientes;