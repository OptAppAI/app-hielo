import React, {useState} from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { TaskBar } from '../BarraTareas/BarraTareas';
import ListaProductos from './ListaProductos';
import ProductoFormulario from './ProductoFormulario';
import VentanaEmergente from '../VentanaEmergente';
import ResumenVentas from './ResumenVentas';

/*====================================== Estilos CSS del componente ==========================================================*/

const Principal = styled.div`
  background: linear-gradient(rgb(0, 0, 0), 15%,rgb(37, 37, 46), 60%, #151c38);
  color: black;
  font-weight: 100;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 3fr 8fr;
  grid-template-rows: 0.5fr 6fr 2fr;
  grid-template-areas: "BarraTareas BarraTareas"
                       "PanelControl ContenidoPrincipal"
                       "Herramientas ContenidoPrincipal";
`;

const BarraTareas = styled.div`
  background: #ffffff;
  color: black;
  grid-area: BarraTareas;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
`;

const PanelControl = styled.div`
  position: relative; 
  grid-area: PanelControl;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 5px;
`;

const ContenidoPrincipal = styled.div`
  background: white;
  grid-area: ContenidoPrincipal;
  overflow: auto;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

const Herramientas = styled.div`
  background: #ffffff;
  color: black;
  grid-area: Herramientas;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BotonVenta = styled.input`
  width: 50%;
  height: 50px;
  background-color: green;
  color: white;
  text-align: center;
  font-weight: bold;
  border: none;
  border-radius: 5px;

&:hover:enabled {
  background-color: #000000;
  color: white;
}

&:disabled {
  background-color: #012b00;
}
`;
  //Datos de productos y clientes
  var productosInventario = [{productoID: 0, nombre: 'Bolsa de Hielo 5kg', cantidad: 50},  {productoID: 1, nombre: 'Bolsa de Hielo 3kg', cantidad: 100},
                             {productoID: 2, nombre: 'Bolsa de Hielo 2kg', cantidad: 150}, {productoID: 3, nombre: 'Costal 15kg', cantidad: 20},
                             {productoID: 4, nombre: 'Costal 35kg', cantidad: 30},         {productoID: 5, nombre: 'Barra de Hielo 50kg', cantidad: 10},
                             {productoID: 6, nombre: 'Barra de Hielo 75kg', cantidad: 80}, {productoID: 7, nombre: 'Costal Gourmet 15kg', cantidad: 25},
                             {productoID: 8, nombre: 'Bolsa Gourmet 5kg', cantidad:200}
  ];

  var clientes = [
                      {clienteID: 0, nombre: 'No es cliente', precios: [60.00, 55.00, 50.00, 45.00, 40.00, 35.00, 30.00, 25.00, 20.00]},
                      {clienteID: 1, nombre: 'Cliente A', precios: [160.00, 155.00, 150.00, 145.00, 140.00, 135.00, 130.00, 125.00, 120.00]},
                      {clienteID: 2, nombre: 'Cliente B', precios: [260.00, 255.00, 250.00, 245.00, 240.00, 235.00, 230.00, 225.00, 220.00]},
                      {clienteID: 3, nombre: 'Cliente C', precios: [360.00, 355.00, 350.00, 345.00, 340.00, 335.00, 330.00, 325.00, 320.00]},
                      {clienteID: 4, nombre: 'Cliente D', precios: [460.00, 455.00, 450.00, 445.00, 440.00, 435.00, 430.00, 425.00, 420.00]},
                      {clienteID: 5, nombre: 'Cliente E', precios: [560.00, 555.00, 550.00, 545.00, 540.00, 535.00, 530.00, 525.00, 520.00]},
                      {clienteID: 6, nombre: 'Cliente F', precios: [660.00, 655.00, 650.00, 645.00, 640.00, 635.00, 630.00, 625.00, 620.00]},
                      {clienteID: 7, nombre: 'Cliente G', precios: [760.00, 755.00, 750.00, 745.00, 740.00, 735.00, 730.00, 725.00, 720.00]},
  ];

  
function PaginaVentas() {

  //Hook para manejar el estado de la lista de productos
  const [productos, setProductos] = useState([]);

  //Funcion para agregar productos a la lista a partir del formulario
  const agregarProducto = (producto) => {
    const productosActualizados = [producto,...productos];
    setProductos(productosActualizados);
  };

  //Hook para manejar el estado de la venta
  const [confirmaciones, setConfirmaciones] = useState([]);

  //Funcion para agregar estado de confirmacion para cada estado del producto
  const agregarConfirmacion = (productoID) => {
    const nuevoValor = [{productoID: productoID, valor: false}, ...confirmaciones];
    setConfirmaciones(nuevoValor);
  }
  //Funciones para modficar el estado actual de confirmacion para cada producto
  const confirmarProducto = (productoID) => {
    const nuevoValor = {productoID: productoID, valor: true};
    const confirmacionesActualizadas = confirmaciones.filter( confirmacion => confirmacion.productoID !== productoID);
    const confirmacionesNuevas = [nuevoValor, ...confirmacionesActualizadas];
    setConfirmaciones(confirmacionesNuevas);
  }
  
  //Funcion para modificar la cantidad de producto despuea confirmado
  const desconfirmarProducto = (productoID) => {
    const nuevoValor = {productoID: productoID, valor: false};
    const confirmacionesActualizadas = confirmaciones.filter( confirmacion => confirmacion.productoID !== productoID);
    const confirmacionesNuevas = [nuevoValor, ...confirmacionesActualizadas];
    setConfirmaciones(confirmacionesNuevas);
  }

  //Funcion para agregar la propiedad cantidad y total al producto con ID 
  const propiedadCantidad = (productoID, cantidad) => {

  const productosModificados = productos.map( producto => {
    if(producto.productoID === productoID){
      producto.cantidad = cantidad;
      producto.total = producto.precioUnitario * producto.cantidad;
    }
    return producto;
  });

    setProductos(productosModificados);
  };

  //Hook para manejar el producto que se elimina de la lista
  const [productoEliminado, setProductoEliminado] = useState();

  //Funcion para eliminar el producto seleccionado de la lista de productos
  const eliminarProducto = (productoID) => {
    const productosActualizados = productos.filter( producto => producto.productoID !== productoID);
    const eliminado = productos.filter ( producto => producto.productoID === productoID);
    const confirmacionesActualizadas = confirmaciones.filter( confirmacion => confirmacion.productoID !== productoID );
    setConfirmaciones(confirmacionesActualizadas);
    setProductos(productosActualizados);
    setProductoEliminado(eliminado);
  }

  //Hook para activar el boton de ventas
  const [realizarVenta, setRealizarVenta] = useState(true);

  //useEffect para activar el boton de Realizar Venta en base al estado de confirmacion de los productos
  useEffect(() => {
    if(confirmaciones.length > 0){
      const valores = confirmaciones.filter(confirmacion => confirmacion.valor === true);
  
      if(valores.length === confirmaciones.length){
        setRealizarVenta(false);
      } else{
      setRealizarVenta(true);
      }} else{
      setRealizarVenta(true);
  }}, [confirmaciones]);

  //Hook para renderizar la ventana emergente

  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);
  
  return (
    <Principal>
      <TaskBar className = 'TakBar' />
      <ContenidoPrincipal>
        <ListaProductos 
          productos = {productos}
          eliminarProducto = {eliminarProducto}
          confirmarProducto = {confirmarProducto}
          desconfirmarProducto = {desconfirmarProducto}
          propiedadCantidad = {propiedadCantidad} />
      </ContenidoPrincipal>
      <PanelControl>
        <ProductoFormulario
          agregarProducto = {agregarProducto}
          productoEliminado = {productoEliminado}
          productosInventario = {productosInventario}
          clientes = {clientes}
          agregarConfirmacion = {agregarConfirmacion}
          />
      </PanelControl>
      <Herramientas>
        <BotonVenta 
        type='submit' 
        value={'Realizar Venta'} 
        disabled = {realizarVenta}
        onClick = {() => setEstadoVentanaEmergente(true)}
        />
      </Herramientas>
      <VentanaEmergente
        operacion={'Resumen de la venta'}
        estado = {estadoVentanaEmergente}
        cambiarEstado = {setEstadoVentanaEmergente}
        setProductos = {setProductos}
        confirmarOperacion = {setRealizarVenta}
        >
        <ResumenVentas 
          productos = {productos}/>
      </VentanaEmergente>
    </Principal>
  );
}

export default PaginaVentas;
