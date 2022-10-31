import React from 'react';
import ProductoModificado from './ProductoModificado';
import styled from 'styled-components';

/*===================================================================================*/
/*==================== Estilos de CSS para la lista de productos ====================*/
const Productos = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 150px;
  grid-auto-rows: 150px;
  grid-gap: 30px;
`;

/*====================================================================================*/
/*=============================Funcion de Lista de productos JSX ======================*/
function ListaProductos({productos, eliminarProducto}) {

  //Si la lista de productos tiene al menos un producto retornar el siguiente componente:
  if(productos.length){
    return(
    <Productos>
      {productos.map( producto => {
        return(
          <ProductoModificado
          key = {producto.productoID}
          productoID = {producto.productoID}
          modificacion = {producto.modificacion} 
          nombre = {producto.productoNombre}
          cantidad = {producto.cantidad}
          precio = {producto.precio}
          eliminarProducto = {eliminarProducto}/>
    )})}
    </Productos>
  )}};

export default ListaProductos;

