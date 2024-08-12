import {React} from 'react'

// IMPORTAR COMPONENTES
import SideBarMenu from './SideBarMenu';
import ContenedorServicios from '../Servicios/ContenedorServicios';
const PaginaPrincipal = () => {
  return (
    <div className="App">
     <a>Pagina Principal</a>
     <SideBarMenu/> 
    <ContenedorServicios/>
    </div>
  );
}

export default PaginaPrincipal;