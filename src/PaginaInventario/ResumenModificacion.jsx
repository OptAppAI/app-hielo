import React from 'react';
import styled from 'styled-components';

/* ============================ Estilos CSS del Resumen de la Modificacion =================================== */

const ContenedorResumen = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;
  margin-bottom: 40px;
  text-align: left;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 30px;
  grid-template-rows: auto;
  grid-template-areas: 'Producto Operacion Precio';
`;

const Producto = styled.div`
  grid-area: Producto;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Operacion = styled.div`
  grid-area: Operacion;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Precio = styled.div`
  grid-area: Precio;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const Texto = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;


/*============================== Funcion JSX de Resumen de la Modificacion ==================================*/
function ResumenModificacion({productos}){
  return(
    <>
    <ContenedorResumen>
      <Producto>
        <Texto>Producto</Texto>
        {productos.map(producto => {
          return(
            <Texto key={producto.productoID}>{producto.productoNombre}</Texto>
          )
        })}
      </Producto>
      <Operacion>
        <Texto>Inventario</Texto>
        {productos.map(producto => {
          if(producto.modificacion){
            return(
              <Texto key={producto.productoID}>{'Agregar ' + producto.cantidad + ' unidades'}</Texto>)
            }else if (producto.modificacion === false){
              return(
                <Texto key={producto.productoID}>{'Eliminar ' + producto.cantidad + ' unidades'}</Texto>)
            } else {
              return(
                <Texto key={producto.productoID}>Sin Modificar</Texto>)
            }
          })}
      </Operacion>
      <Precio>
        <Texto>Precio</Texto>
        {productos.map(producto => {
          if(producto.precio){
            return(
              <Texto key={producto.productoID}>{'$ ' + producto.precio.toFixed(2)}</Texto>)
            } else {
              return(
                <Texto key={producto.productoID}>Sin Modificar</Texto>)
            }
          })}
      </Precio>
    </ContenedorResumen>
    </>
  )
}

export default ResumenModificacion;