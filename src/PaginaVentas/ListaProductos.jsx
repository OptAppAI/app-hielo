import React from 'react';
import Producto from './Producto';
import styled from 'styled-components';

/*===================================================================================*/
/*==================== Estilos de CSS para la lista de productos ====================*/
const Productos = styled.div `
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px;
  grid-auto-rows: 120px;
  grid-gap: 15px;
`;

/*====================================================================================*/
/*=============================Funcion de Lista de productos JSX ======================*/
function ListaProductos( {productos, eliminarProducto, confirmarProducto, desconfirmarProducto, propiedadCantidad} ) {

  //Si la lista de productos tiene al menos un producto retornar el siguiente script:
  if(productos.length){
  return (
      <Productos>
        {
          productos.map (producto => {
            return(
              <Producto 
              key = {producto.productoID}
              producto = {producto}
              eliminarProducto = {eliminarProducto}
              confirmarProducto = {confirmarProducto}
              desconfirmarProducto = {desconfirmarProducto}
              propiedadCantidad = {propiedadCantidad}/>
           )})}
      </Productos>
  )}}

export default ListaProductos;