import React from 'react';
import styled from 'styled-components';

/* ============================ Estilos CSS del Resumen de Ventas =================================== */

const ContenedorResumen = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;
  margin-bottom: 40px;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: 30px;
  grid-template-rows: auto;
  grid-template-areas: 'Producto Cantidad Precio';
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

const Cantidad = styled.div`
  grid-area: Cantidad;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }

  & div:nth-last-child(3){
    font-weight: bold;
    margin-top: 20px;
  }

  & div:nth-last-child(2){
    font-weight: bold;
  }
  
  & div:last-child {
    font-weight: bold;
    margin-top: 25px;
  }
`;

const Monto = styled.div`
  grid-area: Precio;
  display: flex;
  flex-direction: column;

  & div:first-child {
    font-weight: bold;
    margin-bottom: 20px;
  }

  & div:nth-last-child(4){
    font-weight: bold;
  }

  & div:nth-last-child(3){
    font-weight: bold;
  }
  
  & div:last-child {
    font-weight: bold;
    margin-top: 5px;
  }
`;

const Texto = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Linea = styled.div`
  align-self: left;
  margin: 9px 0px 9px 0px;
  width: 100%;
  height: 2px;
  background-color: black;
`

/*============================== Funcion JSX del Resumen de ventas ===================================*/
function ResumenVentas ({productos}) {
  let subtotal = 0;
  for(let i = 0; i < productos.length; i++){
    subtotal += productos[i].total;
  };

  const IVA = subtotal*.16;
  const total = subtotal*1.16;

  return(
    <>
      <ContenedorResumen>
        <Producto>
          <Texto>Producto</Texto>
          {productos.map(producto => {
            return(<Texto key={producto.productoID}>{producto.productoNombre}</Texto>)
          })}
        </Producto>
        <Cantidad>
          <Texto>Cantidad</Texto>
          {productos.map(producto => {
            return(<Texto key={producto.productoID}>{producto.cantidad}</Texto>)
          })}
          <Texto>Subtotal:</Texto>
          <Texto>IVA:</Texto>
          <Texto>Total:</Texto>
        </Cantidad>
        <Monto>
          <Texto>Monto</Texto>
          {productos.map(producto => {
            return(<Texto key={producto.productoID}>$ {(producto.total).toFixed(2)}</Texto>)
          })}
          <Linea></Linea>
          <Texto>$ {subtotal.toFixed(2)} MXN</Texto>
          <Texto>$ {IVA.toFixed(2)} MXN</Texto>
          <Linea></Linea>
          <Texto>$ {total.toFixed(2)} MXN</Texto>
        </Monto>
      </ContenedorResumen>
    </>
  )
}

export default ResumenVentas;