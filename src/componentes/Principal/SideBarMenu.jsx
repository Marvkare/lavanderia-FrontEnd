import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/SidebarMenu.css';

const SideBarMenu = ({ idUsuario }) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = (url) => {
    navigate(url);
  };

  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      <Button
        variant="primary"
        className="toggle-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'Hide' : 'Show'}
      </Button>
      {isVisible && (
        <div className="menu-content">
          <h4>Menu </h4>
          <b>Lavanderia @</b>
          <Button variant="outline-dark" onClick={() => handleButtonClick('/admin/usuario')}>
            Administrar usuarios
          </Button>
          {idUsuario !== 2 && (
            <Button variant="outline-dark" onClick={() => handleButtonClick('/admin/clientes')}>
             Administrar clientes 
            </Button>
          )}
          <Button variant="outline-dark" onClick={() => handleButtonClick('/admin/servicios')}>
            Admin servicios
          </Button>
          <Button variant="outline-dark" onClick={() => handleButtonClick('/url4')}>
            Botón 4
          </Button>
          <Button variant="outline-dark" onClick={() => handleButtonClick('/url5')}>
            Botón 5
          </Button>
        </div>
      )}
    </div>
  );
};

export default SideBarMenu;
