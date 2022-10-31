import React from 'react';
import styled from 'styled-components';
import ModificarProducto from './ModificarProducto'


const Formulario1 = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

const Formulario2 = styled.div`
  width: 100%;
  height: 100%;
  background-color: green;
`;

const Formulario3 = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
`;

function FormularioSeleccionado( {opcionFormulario, productosInventario, agregarProducto, productoEliminado} ) {
  switch(opcionFormulario){
    case 0:
      return(
        <ModificarProducto 
        productosInventario = {productosInventario}
        agregarProducto = {agregarProducto}
        productoEliminado = {productoEliminado}/>
      )
    case 1:
     return(
        <Formulario1/>
      )
    case 2:
      return(
        <Formulario3/>
      )
    default:
      return(
        <Formulario1/>
      )
    }
}

export default FormularioSeleccionado;

