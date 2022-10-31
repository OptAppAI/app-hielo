import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/*===========================================================================*/
/*==================== Estilos de CSS para el formulario ====================*/
const Formulario = styled.form`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 0.3fr 1fr 1fr;
  grid-template-areas: "nombre"
                       "cliente"
                       "checkbox"
                       "descuento"
                       "submit";
`;

/* Estilos contenedores input */

const Div = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputNombre = styled(Div)`
  grid-area: nombre;
`;

const InputCliente = styled(Div)`
  grid-area: cliente;
`;

const InputDescuento = styled(Div)`
  grid-area: descuento;
`;

const InputCheckbox = styled(Div)`
  grid-area: checkbox;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 8fr;
  grid-template-rows: 1fr;
  grid-template-areas: "Checkbox Texto";
`;

const InputSubmit = styled(Div)`
  grid-area: submit;
`;

/* Estilos de los input */

const Input = styled.input`
  position: absolute;
  width: 80%;
  height: 50%;
  background-color: white;
  color: rgb(50, 50, 50);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  border: none;

  &:hover:enabled {
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }
`;

const Descuento = styled(Input) `
  grid-area: descuento;
  font-weight: bold;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);

  &:disabled {
    background: transparent;
    color: transparent;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const Checkbox = styled(Input)`
  grid-area: Checkbox;
  width: 60%;
  height: 60%;
  justify-self: left;

  &:disabled {
    background-color: red;
  }
`;

const Texto = styled.p `
 grid-area: Texto;
 color: white;
 justify-self: left;
 user-select: none;
`;

const Select = styled.select `
  position: relative;
  width: 80%;
  height: 50%;
  background-color: white;
  color: rgb(50, 50, 50);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-weight: bold;
  border: none;

  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }
`;


/*============ Codigo de JSX para generar el formulario =======================*/


/*Funcion que retornará el formulario usando la librería 'react-hook-form'*/
function ProductoFormulario({agregarProducto, productosInventario, productoEliminado, clientes, agregarConfirmacion}) {
  
  //Hook para manejar y actualizar los productos no seleccionados
  const[productos, setProductos] = useState(productosInventario);

  //Funcion para actualizar la lista de productos no seleccionados
  const actualizarProductos = (productoID) => {
    const nuevosProductos = productos.filter(producto => producto.productoID !== productoID);
    setProductos(nuevosProductos);
  }
  
  //useEffect para actualizar la lista de productos no seleccionados una vez que se cancela un producto seleccionado
  useEffect (() => {
    
    if(productoEliminado !== undefined){
      const nuevoProducto = productosInventario.filter( productoInventario => productoInventario.productoID === productoEliminado[0].productoID);
      const nuevosProductos = [nuevoProducto[0] ,...productos];
      setProductos(nuevosProductos);
    }

  }, [productoEliminado])

 /* Llamar a los métodos que se utilizarán de React-Hook-Form */
  const {register, resetField, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      clienteID: 0,
      checkbox: false,
  }});
 
  //Uso de la funcion watch() para conocer el estado de variables de interes en el formulario
  //y que aun no se envia
  const watchCheckbox = watch('checkbox');
  const watchCliente = watch('clienteID');

  useEffect(() => {
    resetField('checkbox');
    resetField('descuento');
  }, [productos]);

  useEffect(() => {
    if(watchCliente !== 0){
    resetField('checkbox');
    resetField('descuento'); 
  }}, [watchCliente]);

  useEffect(() => {
    resetField('descuento');
  }, [watchCheckbox]);

  useEffect(() => {
    if(productos.length !==0){
    setValue('productoID', productos[0].productoID);
    }
  },[productos]);

  //Funcion para generar el objeto 'producto' con la informacion recibida del formulario
  //y ejecutar las funciones de actualizacion definidas anteriormente
  const onSubmit = (data) => {

    const producto = {
      productoID: data.productoID,
      productoNombre: productosInventario[data.productoID].nombre,
      cantidadDisponible: productosInventario[data.productoID].cantidad,
      clienteID: data.clienteID,
      cliente: clientes[data.clienteID].nombre,
      precioUnitario: clientes[data.clienteID].precios[data.productoID],
    }; 

    //Si se aplico un descuento actualizar el precio del producto
    if(data.checkbox === true){
      producto.precioUnitario = clientes[data.clienteID].precios[data.productoID]*(1 - (data.descuento/100));
    }
   
    agregarProducto(producto);
    agregarConfirmacion(producto.productoID);
    actualizarProductos(producto.productoID);
    resetField('productoID');
  };

  return(
      <Formulario onSubmit={handleSubmit(onSubmit)}>
        <InputNombre>
          <Select
            onFocus='open'
            {...register("productoID", {valueAsNumber: true, disabled: productos.length === 0})}>
              {productos.map((producto) => (
                <option key = {producto.productoID} value = {producto.productoID} >{producto.nombre}</option>
              ))}
          </Select>
        </InputNombre>
        <InputCliente>
          <Select
              {...register("clienteID", {
                valueAsNumber: true,
                disabled: productos.length === 0})}>
              {clientes.map((cliente) => (
                <option key = {cliente.clienteID} value = {cliente.clienteID} >{cliente.nombre}</option>
              ))}
          </Select>
        </InputCliente>
        <InputCheckbox>
          <Checkbox
            type='checkbox'
            {...register('checkbox',
            {disabled: (watchCliente !== 0)})}>
          </Checkbox>
          <Texto>Aplicar descuento</Texto>
        </InputCheckbox>
        <InputDescuento>
          <Descuento 
            type='number'
            {...register('descuento',
            {required: true,
             valueAsNumber: true,
             min: {
              value: 0,
              message: 'Ingrese un numero mayor a 0'
             },
             max: {
              value: 100,
              message: 'Ingrese un numero menor a 100'
             },
             disabled: !watchCheckbox})}
            placeholder='Ingrese el descuento'>
          </Descuento>
        </InputDescuento>
        <InputSubmit>
          <Input
                value ='Agregar producto'
                className ='submit' 
                type ='submit'
                disabled = {productos.length === 0}/>
        </InputSubmit>
      </Formulario>
  )
}

export default ProductoFormulario;
