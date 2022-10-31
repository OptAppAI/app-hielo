import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'


export const TaskBar = () => {
    const EstiloActivo = ({isActive}) => {
        return{
            fontWeight: isActive ? 'bold' : "normal",
            textDecoration: isActive ? 'none' : 'none',
            fontSize: isActive ? '1em' : '1em', 
            position: "static",
            justify: "center",
            align: "center",
            backgroundColor: isActive ? "pass" : "pass",
            borderRadius: "5px",
       }
    }

    const EstiloSesion = () => {
        return{
            textDecoration: 'none',
            display: 'inlineBlock',
            position: 'static',
            fontSize: '100%',
            fontWeight: 'bold'
       }  
    }   

    return(
        <div className="taskBar">
            <div className="Ventas">
                <nav>
                    <NavLink style={EstiloActivo} to='/ventas'>Ventas</NavLink>
                </nav>
            </div>
            <div className="Productos" >
                <nav>
                    <NavLink style= {EstiloActivo} to='/productos'>Productos</NavLink>
                </nav>
            </div>
            <div className="Clientes" >
                <nav>
                    <NavLink style= {EstiloActivo} to="/clientes">Clientes</NavLink>
                </nav>
            </div>
            <div className='Empleados'>
                <nav>
                    <NavLink style= {EstiloActivo} to='/empleados'>Empleados</NavLink>
                </nav>
            </div>
            <div className="Ruta">
                <nav>
                    <NavLink style= {EstiloActivo} to='/ruta'>Ruta</NavLink>
                </nav>
            </div>
            <div className="Logo" >
                <img src='../Imagenes/Logo.png' width= "90px" height= "95%" />
            </div>
            <div className="Usuario">
                <img src='../Imagenes/Usuario.png' width='50px' heignt="95%" />
            </div>
            <div className="Sesion">
                <nav>
                    <NavLink style= {EstiloSesion} to='/'>Iniciar Sesion</NavLink>
                </nav>
            </div>
        </div>
)}