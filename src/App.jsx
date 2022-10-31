import { Routes, Route } from 'react-router-dom'
import PaginaVentas  from './PaginaVentas/PaginaVentas';
import InicioSesion  from './InicioSesion/InicioSesion';
import PaginaInventario from './PaginaInventario/PaginaInventario';
import {PaginaConstruccion1} from './TrabajoEnProgreso/PaginaConstruccion1';
import {PaginaConstruccion2} from './TrabajoEnProgreso/PaginaConstruccion2';
import {PaginaConstruccion3} from './TrabajoEnProgreso/PaginaConstruccion3';
import './App.css';

function App(){
  return (
    <Routes>
      <Route path= "/" element={ <InicioSesion/> }/>
      <Route path= "clientes" element={<PaginaConstruccion1/>}/>
      <Route path= "ventas" element={<PaginaVentas/>}/>
      <Route path= "empleados" element= {<PaginaConstruccion2/>}/>
      <Route path='ruta' element= {<PaginaConstruccion3/>}/>
      <Route path='productos' element= {<PaginaInventario/>}/>
    </Routes>
  );
}

export default App;