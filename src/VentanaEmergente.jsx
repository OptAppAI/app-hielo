import React from 'react';
import styled from 'styled-components';


/*======================================== Estilos CSS de la ventana emergente ========================================*/
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContenedorVentana = styled.div`
  position: relative;
  min-width: 500px;
  min-height: 100px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0px 7px 30px 0px rgba(0, 0, 0, 0.5);
  padding: 20px 20px 20px 20px;
  user-select: none;
`;

const TituloOperacion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #d9d9d9;

  h3{
    font-weight: bold;
    font-size: 1.2em;
    color: #000000
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 70px;
  height: 30px;
  background-color: #b10000;
  font-weight: bold;
  font-size: 0.9em;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover{
    background-color: red;
  }
`;

const BotonAceptar = styled.button`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 40px;
  text-align: center;
  background-color: green;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;

  &:hover {
    background-color: #00a900;
  }

`;


/* ===================================== Funcion JSX de la ventana emergente ===============================*/
function VentanaEmergente ({children, estado, cambiarEstado, setProductos, confirmarOperacion, operacion}) {
    return(
      <>
        {estado && 
          <Overlay>
            <ContenedorVentana>
              <TituloOperacion>
                <h3>{operacion}</h3>
              </TituloOperacion>
              <BotonCerrar onClick={() => cambiarEstado(false)}>Cancelar</BotonCerrar>
              {children}
              <BotonAceptar onClick={() => {
                setProductos([]);
                confirmarOperacion(true);
                cambiarEstado(false);
                }}>Aceptar</BotonAceptar>
            </ContenedorVentana>
          </Overlay>
        }
      </>
  )
}

export default VentanaEmergente;