import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';

/* Estilos CSS del componente Modificar Producto ================================*/
const Formulario = styled.form`
  width: 100%;
  height: 100%;
  color: white; 
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  grid-template-areas: 'OpcionCantidad OpcionCantidad OpcionPrecio OpcionPrecio'
                       'Producto Producto SelectProductos SelectProductos'
                       'SelectModificacion SelectModificacion InputCantidad InputCantidad'
                       'Precio Precio InputPrecio InputPrecio'
                       'InputSubmit InputSubmit InputSubmit InputSubmit';
`;

const OpcionCantidad = styled.div`
  grid-area: OpcionCantidad;
  border-radius:5px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'Texto Checkbox';
  justify-items: center;
  align-items: center;
`;

const OpcionPrecio = styled.div`
  grid-area: OpcionPrecio;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'Texto Checkbox';
  justify-items: center;
  align-items: center;
`;

const Checkbox = styled.input`
  grid-area: Checkbox;
  justify-self: left;
  width: 25px;
  height: 25px;
  background-color: ${props => props.estado ? '#00a900' : 'white'};
  border-radius: 50%;
  -webkit-appearance: none;
  -moz-appareance: none;
  appearance: none;
  border: solid 3px white;
`;

const Texto = styled.p`
  grid-area: Texto;
  justify-self: center;
  user-select: none;
`

const Div = styled.div`
  width: 80%;
  height: 40px;
  justify-self: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 0.8em;
  user-select: none;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  transition: 0.2s ease all;
`;

const Producto = styled(Div)`
  grid-area: Producto;
  color: ${props => props.estado ? 'rgb(50, 50, 50);' : 'rgba(50, 50, 50, 0.5)'};
`;

const Precio = styled(Div)`
  grid-area: Precio;
  color: ${props => props.estado ? 'rgb(50, 50, 50);' : 'rgba(50, 50, 50, 0.5)'};
`;

const Select = styled.select`
  width: 80%;
  height: 40px;
  font-weight: bold;
  color: rgb(50, 50, 50);
  background-color: white;
  justify-self: center;
  text-align: center;
  border: none;
  border-radius: 5px;
  padding-left: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  transition: 0.2s ease all;
  
  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }

  &:disabled{
    color: rgba(50, 50, 50, 0.5);
  }
`;
const SelectProductos = styled(Select)`
  grid-area: SelectProductos;
`;

const SelectModificacion = styled(Select)`
  grid-area: SelectModificacion;
`;


const Input = styled.input`
  width: 80%;
  height: 40px;
  color: rgb(50, 50, 50);
  font-weight: bold;
  justify-self: center;
  text-align: center;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);

  &:focus {
    outline: none;
    border: none;
  }

  &:disabled{
    background-color: white;   
  }

  &:enabled::placeholder{
    color: rgb(50, 50, 50);
    opacity: 1;
  }

  &::placeholder:disabled{
    opacity: 0.5;
  }

  &:hover:enabled{
    box-shadow: 0px 1px 5px 1px rgba(95, 111, 188, 0.8);
  }

`;

const InputCantidad = styled(Input)`
  grid-area: InputCantidad;
`;

const InputPrecio = styled(Input)`
  grid-area: InputPrecio;
`;

const InputSubmit = styled(Input)`
  grid-area: InputSubmit;
  width: 40%;
  align-content: center;

  &:disabled {
    color: rgba(50, 50, 50, 0.5);
  }

  &:hover{
    background-color: white;
  }
`;




/*======================= Funcion JSX de la Pagina para administrar el Inventario ===============================*/

  //Funcion JSX que genera el formulario para modificar los productos
  function ModificarProducto ({productosInventario, agregarProducto, productoEliminado}) {

     //Hook para manejar y actualizar los productos no seleccionados
     const [productos, setProductos] = useState(productosInventario);
    
     //Funcion para actualizar la lista de productos no seleccionados
     const actualizarProductos = (productoID) => {
       const productosActualizados = productos.filter(producto => producto.productoID !== productoID);
       setProductos(productosActualizados)
     };

     //useEffect para actualizar la lista de producto no seleccionados una vez que se cancela un producto seleccionado
     useEffect(() => {
      if(productoEliminado !== undefined){
        const nuevoProducto = productosInventario.filter( productoInventario => productoInventario.productoID === productoEliminado[0].productoID);
        const nuevosProductos = [nuevoProducto[0], ...productos];
        setProductos(nuevosProductos);
      }
     }, [productoEliminado])

    //Llamar a los métodos que se utilizarán dentro del formulario//
    const {register, 
          resetField, 
          handleSubmit, 
          watch,
          setValue,
          getValues,
          formState:{ errors }
        }  = useForm({
        defaultValues: {
        productoID: 0,
        modificacion: 0,
        checkboxPrecio: false,
        checkboxCantidad: true,
    }});
    
    //Revisar el estado de los checkbox 
    const watchCheckboxPrecio = watch('checkboxPrecio');
    const watchCheckboxCantidad = watch('checkboxCantidad');
    const watchProductoID = watch('productoID');

    //Obtener la cantidad maxima que se puede eliminar
    let cantidadMinima;

    if(watchProductoID !== undefined){
    cantidadMinima = (productosInventario.filter(producto => producto.productoID === watchProductoID))[0].cantidad;
    } else {
      cantidadMinima = 0;
    }

    //Resetear todos los campos cuando se ha modificado un producto
    useEffect(() => {
      resetField('cantidad');
      resetField('checkboxCantidad');
      resetField('precio');
      resetField('checkboxPrecio');
      if(productos.length !== 0){
        setValue('productoID', productos[0].productoID);
      } else{
        resetField('productoID');
      }
    }, [productos]);

    //Resetear la cantidad ingresada cuando se selecciona otro producto
    useEffect(() => {
      resetField('cantidad');
    }, [watchProductoID]);

    const onSubmit = (data) => {
      const producto = {
        productoID: data.productoID,
        productoNombre: productosInventario[data.productoID].nombre
      };
  
      if (data.checkboxCantidad){
        producto['cantidad'] = data.cantidad;
        if(data.modificacion == 0){
          producto['modificacion'] = true;
        } else {
          producto['modificacion'] = false;
        }
    }
  
      if (data.checkboxPrecio){
        producto['precio'] = data.precio;
      }
  
      actualizarProductos(data.productoID);
      agregarProducto(producto);
      console.log(producto);
    };

    return(
      <>
        <Formulario 
          onSubmit = {handleSubmit(onSubmit)}
          autoComplete = 'off'>
          <OpcionCantidad>
            <Texto>
              Cantidad
            </Texto>
            <Checkbox
              estado = {watchCheckboxCantidad}
              type = 'checkbox'
              {...register('checkboxCantidad', {
                disabled: productos.length === 0
              })} />
           </OpcionCantidad>
           <OpcionPrecio>
            <Texto>
              Precio
            </Texto>
            <Checkbox
            estado = {watchCheckboxPrecio}
              type = 'checkbox'
              {...register('checkboxPrecio', {
                disabled: productos.length === 0
              })} />
          </OpcionPrecio>
          <Producto estado = {watchCheckboxPrecio || watchCheckboxCantidad}>Producto</Producto>
          <SelectProductos
            {...register('productoID', {
              valueAsNumber: true,
              disabled: productos.length === 0 || (!watchCheckboxCantidad && !watchCheckboxPrecio)
            })}>
              {productos.map((producto) => (
                <option 
                key = {producto.productoID}
                value = {producto.productoID}>
                  {producto.nombre}
                </option>
              ))}
          </SelectProductos>
          <SelectModificacion
            {...register('modificacion', {
              disabled: !watchCheckboxCantidad
            })}
            onChange = {() => resetField('cantidad')}>
            <option key = {0} value = {0}>Agregar</option>
            <option key = {1} value = {1}>Eliminar</option>
          </SelectModificacion>
          <InputCantidad
            {...register('cantidad',{
              valueAsNumber: true,
              disabled: !watchCheckboxCantidad,
              validate:  {
                esEntero: (value) => Number.isInteger(value),
                esPositivo: (value) => (value > 0),
                minimo: (value) => (value <= cantidadMinima)||(getValues('modificacion') == 0)
            }})}
             placeholder = 'Ingrese la cantidad' />
          <Precio estado = {watchCheckboxPrecio}>Precio</Precio>
          <InputPrecio
            {...register('precio', {
              valueAsNumber: true,
              disabled: !watchCheckboxPrecio,
              validate: {
                esNumero: (value) => (!isNaN(value)),
                esPositivo: (value) => value >= 0
              }
              })}
              placeholder='Ingrese el precio' />
          <InputSubmit
          type='submit'
          value = 'Modificar producto'
          disabled = {productos.length === 0 || (!getValues('checkboxCantidad')&& !getValues('checkboxPrecio') )} />
        </Formulario>
      </>
    )
  }

export default ModificarProducto