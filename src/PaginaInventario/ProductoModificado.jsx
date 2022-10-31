import React from 'react';
import styled from 'styled-components';

const ProductoContenedor = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-gap: 10px;
  border-radius: 5px;
  grid-template-columns: auto 5fr 2fr;
  grid-template-areas: 'ImagenProducto ModificacionProducto EliminarOperacion';
`;

const FlexDiv = styled.div `
  padding: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  user-select: none;
`;

const ImagenProducto = styled(FlexDiv)`
  grid-area: ImagenProducto;
  position: relative;
  justify-content: center;
  padding: 0px;
  min-width: 130px;
`;

const ModificacionProducto = styled(FlexDiv)`
  grid-area: ModificacionProducto;
  text-align: center;
  margin-left: 30px; 

  & p:first-child{
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const EliminarOperacion = styled(FlexDiv)`
  grid-area: EliminarOperacion;
  align-self: center;
  margin-right: 80px;
  background-color: red;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  padding: 2px;
  font-weight: bold;
  font-size: 0.9em;
`

const Imagen = styled.img `
  position:absolute;
  width: 90%;
  height: 90%;
`;


const Texto = styled.p`
  text-align: left;
  height: 100%;
  width: 100%;
`;

function ProductoModificado({productoID, nombre, modificacion, cantidad = 'Sin modificar', precio = 'Sin modificar', eliminarProducto}) {
  
  //Modificar el texto mostrado en el precio
  let textoPrecio;

  if(precio !== 'Sin modificar'){
    textoPrecio = `Precio: $ ${precio.toFixed(2)}`
  }else{
    textoPrecio = 'Precio: No modificado';
  }

  //Modificar el texto mostrado en la cantidad
  let textoCantidad;

  if(cantidad === 'Sin modificar'){
    textoCantidad = 'Cantidad: No modificada';
  } else if(modificacion){
    textoCantidad = 'Agregar: ' + cantidad + ' unidades';
  } else  {
    textoCantidad = 'Eliminar: ' + cantidad + ' unidades';
  }

  return(
    <ProductoContenedor>
      <ImagenProducto>
        <Imagen
          src={`../imagenes/${nombre}.jpg`}
          alt='Bolsa de Hielo'/>
      </ImagenProducto>
      <ModificacionProducto>
        <Texto>Operacion</Texto>
        <Texto>{'Producto: ' + nombre}</Texto>
        <Texto>{textoCantidad}</Texto>
        <Texto>{textoPrecio}</Texto>
      </ModificacionProducto>
      <EliminarOperacion onClick = {() => eliminarProducto(productoID)}>Cancelar</EliminarOperacion>
    </ProductoContenedor>
  )
}

export default ProductoModificado;