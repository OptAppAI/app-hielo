import React from 'react';
import styled from 'styled-components';

/*======================================== Estilos CSS del componente =====================================================*/
const SelectFormulario = styled.select `
  width: 50%;
  height: 40px;
  font-weight: bold;
  background-color: white;
  justify-self: center;
  text-align: center;
  border: none;
  border-radius: 5px;
  padding-left: 5px;

  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }
`;

/*================================ Funcion TSX del Seleccionador del formulario ===========================================*/
function Seleccionador ({setOpcionFormulario}) {
  return(
    <SelectFormulario>
      <option key ={0} value= {0} onClick = {() => setOpcionFormulario(0)}>Modificar Inventario</option>
      <option key ={1} value= {1} onClick = {() => setOpcionFormulario(1)}>Agregar Producto</option>
      <option key ={2} value= {2} onClick = {() => setOpcionFormulario(2)}>Eliminar Producto</option>
    </SelectFormulario>
  )
}

export default Seleccionador;