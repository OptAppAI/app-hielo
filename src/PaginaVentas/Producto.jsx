import React from 'react';
import FormularioCantidad from './FormularioCantidad';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {CancelCircle} from '@styled-icons/icomoon/CancelCircle';
import {CancelPresentation} from '@styled-icons/material-sharp/CancelPresentation';


/*============================== Estilos CSS ======================================*/
/*=================================================================================*/

/*=================== Estilos del contenedor del producto =========================*/
const ProductoContenedor = styled.div `
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: grid;
  border-radius: 5px;
  grid-gap: 5px;
  grid-template-columns: 120px 1.5fr 1fr 1fr 1fr 1fr 0.8fr 0.8fr 0.8fr;
  grid-template-areas: "ImagenProducto NombreProducto PrecioProducto SeleccionadorCantidad CantidadProducto TotalProducto Confirmar Modificar EliminarProducto";
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
`;

/*========================= Estilos genericos del div =====================================*/
const FlexDiv = styled.div `
  padding-top: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  user-select: none;
`;


const ImagenProducto = styled(FlexDiv) `
  position: relative;
  padding: 0px;
  grid-area: ImagenProducto;
`;

const Imagen = styled.img `
  position:absolute;
  width: 90%;
  height: 90%;
`;

const NombreProducto = styled(FlexDiv) `
  grid-area: NombreProducto;
`;

const PrecioProducto = styled(FlexDiv) `
  grid-area: PrecioProducto;
`;

const SeleccionadorCantidad = styled(FlexDiv) `
  position: relative;
  padding: 0px;
  grid-area:  SeleccionadorCantidad;
`;

const CantidadProducto = styled(FlexDiv) `
  grid-area: CantidadProducto;
`;

const TotalProducto = styled(FlexDiv) `
  grid-area: TotalProducto;
`;

const Confirmar = styled.input`
 grid-area: Confirmar;
 width: 90%;
 height: 30px;
 background-color: green;
 color: white;
 align-self: center;
 border: none;
 border-radius: 5px;
 font-weight: bold;

 &:hover:enabled {
  height: 35px;
 }

 &:disabled {
  background-color: #014000;
 }
`;

const Modificar = styled.input`
 grid-area: Modificar;
 width: 90%;
 height: 30px;
 background-color: #1900ff;
 color: white;
 align-self: center;
 border: none;
 border-radius: 5px;
 font-weight: bold;

 &:hover:enabled{
  height: 35px;
 }

 &:disabled {
  background-color: #030036;
 }
`;

const EliminarProducto = styled(FlexDiv)`
  grid-area: EliminarProducto;
  align-self: center;
  width: 90%;
  height: 30px;
  background-color: #d40000;
  color: #ffffff;
  border-radius: 5px;
  padding: 2px;
  font-weight: bold;
  font-size: 0.9em;

  &:hover{
    height: 35px;
  }
`;

const Texto = styled.p `
  text-align: center;
  height: 100%;
  width: 100%;
`;

/*=================================================================================*/
/*================= Funcion JSX del componente Producto ===========================*/
function Producto( {producto, eliminarProducto, confirmarProducto, desconfirmarProducto, propiedadCantidad} ) {
  
  const [confirmar, setConfirmar] = useState(false);
  
  //Hook para manejar el estado de la cantidad de producto seleccionada
  const [cantidad, setCantidad] = useState('');
 
  //Funcion para ingresar la cantidad de producto con el teclado
  const modificarCantidad = (e) => {
    if(e.target.value <= 0){
      setCantidad('');
    } 
     else if(isNaN(parseInt(e.target.value)) || !Number.isInteger(parseFloat(e.target.value))){
      setCantidad('');
    } 
     else if(parseInt(e.target.value)>=producto.cantidadDisponible) {
      setCantidad(producto.cantidadDisponible);
   } 
    else {
      setCantidad((e.target.value));
    }
    e.preventDefault();
  };
  
  //Funcion para aumentar en 5 la cantidad de producto con el boton '+'
  const aumentarCantidad = (e) => {
    if(isNaN(parseInt(cantidad))){
      setCantidad(5);
    }
     else if(parseInt(cantidad) + 5 >= producto.cantidadDisponible) {
      setCantidad(producto.cantidadDisponible);
    } else {
      setCantidad(parseInt(cantidad) + 5);
    }

    e.preventDefault();
  };

  //Funcion para disminuir en 5 la cantidad de producto con el boton '-'
  const disminuirCantidad = (e) => {
    if((parseInt(cantidad) - 5) <= 0){
      setCantidad('');
    } else if (isNaN(parseInt(cantidad) - 5)){
      setCantidad('')
    } else {
      setCantidad(parseInt(cantidad) - 5);
    }
    e.preventDefault();
  };

  return (
    <>
    <ProductoContenedor>
      <ImagenProducto>
          <Imagen
             src={`../imagenes/${producto.productoNombre}.jpg`} />
      </ImagenProducto>
      <NombreProducto>
        <Texto>
          Producto:
        </Texto>
        <Texto>
          {producto.productoNombre}
        </Texto>
      </NombreProducto>
      <PrecioProducto>
        <Texto>
          Precio:
        </Texto>
        <Texto>
          {`$ ${producto.precioUnitario.toFixed(2)}`}
        </Texto>
      </PrecioProducto>
      <SeleccionadorCantidad>
        <FormularioCantidad
          confirmar = {confirmar}
          cantidad = {cantidad}
          modificarCantidad = {modificarCantidad}
          aumentarCantidad = {aumentarCantidad}
          disminuirCantidad = {disminuirCantidad} />
      </SeleccionadorCantidad>
      <CantidadProducto>
        <Texto>
          Cantidad:
        </Texto>
        <Texto>{cantidad}</Texto>
      </CantidadProducto>
      <TotalProducto>
        <Texto>
          Total:
        </Texto>
        <Texto>
          {`$ ${(producto.precioUnitario*cantidad).toFixed(2)}`}
        </Texto>
      </TotalProducto>
      <Confirmar type = 'submit' value = 'Confirmar' disabled = {confirmar || !cantidad}
      onClick = {() => {
        confirmarProducto(producto.productoID);
        propiedadCantidad(producto.productoID, parseInt(cantidad));
        setConfirmar(!confirmar);
      } }/>
      <Modificar type = 'submit' value = 'Modificar' disabled = {!confirmar}
      onClick = {() => {
        desconfirmarProducto(producto.productoID)
        setConfirmar(!confirmar)
      }}/>
      <EliminarProducto onClick={() => {
        eliminarProducto(producto.productoID);}}>
            Eliminar
      </EliminarProducto>
    </ProductoContenedor>
    </>
  )
}

export default Producto;

