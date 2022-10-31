import React from 'react';
import styled from 'styled-components';

/*===============================================================================*/
/*=============================== Estilos CSS ===================================*/
const CantidadContenedor = styled.form `
  position:relative;
  width: 100%;
  height: 100%;
  color: black;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: "BotonMenos InputCantidad BotonMas";
  grid-gap: 2.5%;
  justify-items: center;
  align-items: center;
`;

const FlexDiv = styled.button `
  position: absolute;
  width: 80%;
  height: 40%;
  background-color: white;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.3);

  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: auto;
  }
`;

const BotonMenos = styled(FlexDiv) `
  grid-area: BotonMenos;
`;

const BotonMas = styled(FlexDiv) `
  grid-area: BotonMas;
`;

const InputCantidad = styled.input `
  width: 80%;
  height: 40%;
  text-align: center;
  font-size: 1em;
  position: absolute;
  grid-area: InputCantidad;
  background: rgb(255, 255, 255);
  outline: none;
  border: none;
  box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.3);

  &:disabled {
    background-color: #d3d3d3;
  }
`;

/*================================================================================*/
/*=========== Funcion de JSX del componente FormularioCantidad ===================*/


function FormularioCantidad(props) {
  return (
    <CantidadContenedor>
      <BotonMenos 
        onClick={props.disminuirCantidad} 
        disabled = {props.confirmar}>
           - 
      </BotonMenos>
      <InputCantidad
        className='input-cantidad'
        type='number'
        onChange={props.modificarCantidad}
        disabled = {props.confirmar}
        required 
        value = {props.cantidad}>
      </InputCantidad>
      <BotonMas
        onClick={props.aumentarCantidad}
        disabled = {props.confirmar} >
        +
      </BotonMas>
    </CantidadContenedor>
  );
}

export default FormularioCantidad;