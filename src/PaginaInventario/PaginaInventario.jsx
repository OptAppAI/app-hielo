import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { TaskBar } from '../BarraTareas/BarraTareas';
import Seleccionador from './Seleccionador'
import FormularioSeleccionado from './FormularioSeleccionado';
import ListaProductos from './ListaProductos';
import VentanaEmergente from '../VentanaEmergente';
import ResumenModificacion from './ResumenModificacion';

/*======================= Estilos de CSS =====================*/
const Principal = styled.div `
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgb(0, 0, 0), 15%,rgb(37, 37, 46), 60%, #151c38);
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: 6fr 8fr;
  grid-template-rows: 0.5fr 6fr 2fr;
  grid-template-areas: 'BarraTareas BarraTareas'
                       'PanelControl ContenidoPrincipal'
                       'Herramientas ContenidoPrincipal';
  `;

const BarraTareas = styled.div `
  background: #ffffff;
  color: black;
  grid-area: BarraTareas;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
`;

const ContenidoPrincipal = styled.div `
  grid-area: ContenidoPrincipal;
  background: white;
  overflow: auto;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 30px 50px 30px 50px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

const PanelControl = styled.div `
  grid-area: PanelControl;
  background-color: transparent;
  border-radius: 5px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 6fr;
  grid-template-areas: 'Seleccionador'
                       'Formulario';
`;

const Herramientas = styled.div `
  background: #ffffff;
  width: 90%;
  justify-self: center;
  color: black;
  grid-area: Herramientas;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SeleccionadorContenedor = styled.div`
  grid-area: Seleccionador;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormularioContenedor = styled.div`
  grid-area: Formulario;
  font-weight: bold;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BotonOperacion= styled.input`
  width: 40%;
  height: 50px;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  border: none;
  border-radius: 5px;

&:hover:enabled {
  background-color: #00c000;
  color: white;
}

&:disabled {
  background-color: #012b00;
}
`;

/*======================================================================================================================================================================================*/
  //Datos de productos y clientes
  var productosInventario = [{productoID: 0, nombre: 'Bolsa de Hielo 5kg', cantidad: 50, precio: 100.00},  {productoID: 1, nombre: 'Bolsa de Hielo 3kg', cantidad: 100, precio: 20},
                             {productoID: 2, nombre: 'Bolsa de Hielo 2kg', cantidad: 150, precio: 30}, {productoID: 3, nombre: 'Costal 15kg', cantidad: 20, precio: 40},
                             {productoID: 4, nombre: 'Costal 35kg', cantidad: 30, precio: 40},         {productoID: 5, nombre: 'Barra de Hielo 50kg', cantidad: 10, precio: 50},
                             {productoID: 6, nombre: 'Barra de Hielo 75kg', cantidad: 80, precio: 60}, {productoID: 7, nombre: 'Costal Gourmet 15kg', cantidad: 25, precio: 70},
                             {productoID: 8, nombre: 'Bolsa Gourmet 5kg', cantidad:200, precio: 80}
  ];


function PaginaInventario ()  {
  //Hook para manejar el estado del formulario
  const [opcionFormulario, setOpcionFormulario] = useState(0);

  //Hook para manejar el estado de los productos seleccionados
  const [productos, setProductos] = useState([]);

  //Funcion para agregar productos a la lista a partir del formulario
  const agregarProducto = (producto) => {
    const productosActualizados = [producto, ...productos];
    setProductos(productosActualizados);
    console.log(producto);
  }
  
  //Hook para manejar el estado del producto eliminado de la lista

  const [productoEliminado, setProductoEliminado] = useState();
  //Funcion para eliminar el producto seleccionado de la lista de productos

  const eliminarProducto = (productoID) => {
    const productosActualizados = productos.filter(producto => producto.productoID !== productoID);
    const eliminado = productos.filter (producto => producto.productoID === productoID);
    setProductos(productosActualizados);
    setProductoEliminado(eliminado);
  }

  //Hook para activar el boton de Realizar Operacion
  const [realizarOperacion, setRealizarOperacion] = useState(true);

  //useEffect para activar el boton de Realizar Operacion si existe alguna
  useEffect (() => {
    if(productos.length){
      setRealizarOperacion(false);
    } else{
      setRealizarOperacion(true);
    }
  }, [productos]);

  //Hook para renderizar la ventana emergente

  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);
  



  return(
    <Principal>
      <TaskBar className = 'TaskBar'/>
      <PanelControl>
        <SeleccionadorContenedor>
          <Seleccionador setOpcionFormulario = {setOpcionFormulario}/>
        </SeleccionadorContenedor>
        <FormularioContenedor>
          <FormularioSeleccionado 
            opcionFormulario = {opcionFormulario} 
            productosInventario = {productosInventario} 
            agregarProducto = {agregarProducto}
            productoEliminado = {productoEliminado} />
        </FormularioContenedor>
      </PanelControl>
      <ContenidoPrincipal>
        <ListaProductos
          productos = {productos}
          eliminarProducto = {eliminarProducto}/>
      </ContenidoPrincipal>
      <Herramientas>
        <BotonOperacion
          type = 'submit'
          disabled = {realizarOperacion}
          value={'Registrar Operacion'}
          onClick = {() => setEstadoVentanaEmergente(true)}/>
      </Herramientas>
      <VentanaEmergente 
        operacion={'Resumen de la Operacion'}
        estado = {estadoVentanaEmergente}
        cambiarEstado = {setEstadoVentanaEmergente}
        setProductos = {setProductos}
        confirmarOperacion = {setRealizarOperacion}>
          <ResumenModificacion
            productos = {productos}/>
      </VentanaEmergente>
    </Principal>
  )
}

export default PaginaInventario;