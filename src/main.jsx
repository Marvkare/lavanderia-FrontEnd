import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
//importa componentes
import UsuariosMain from './componentes/AdminUsuarios/AdminUsuariosMain.jsx';
import Login from './componentes/Login/Login';
import PaginaPrincipal from './componentes/Principal/PaginaPrincipal';
import AdminClientes from './componentes/AdminClientes/AdminClientes.jsx';
import ServiciosAdmin from './componentes/AdminServicios/ServiciosAdmin.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/> ,
   
  },
  {
     path:"/paginaprincipal",
     element:<PaginaPrincipal/>
  },
  {
     path:"/admin/usuario",
     element:<UsuariosMain/>
  },
  {
    path:"/admin/clientes",
    element:<AdminClientes/>
  },
  {
    path:"/admin/servicios",
    element:<ServiciosAdmin/>
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
