import { useEffect, useState } from 'react';
import { useProductos } from '../ProductosComponentes/hook/useProductos';

export const GuardarCarrito = ({ id, nombre, precio, cantidad }) => {
  const {
    cargando,
    formulario,
    error,
    mensajeExito,
    handleChange,
    obtenerProductoId
  } = useProductos();

  const[noti, setNoti]=useState(false);

  const EjecutarGuardarCarrito = (e) => {
    e.preventDefault();

    const productosCarrito = JSON.parse(localStorage.getItem('Carrito')) || [];
    const index = productosCarrito.findIndex(
      (producto) => producto.id === id
    );

    if (index !== -1) {
      productosCarrito[index].cantidad += 1;
    } else {
      const nuevoProducto={
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: 1
      }
      productosCarrito.push(nuevoProducto);
    }
    localStorage.setItem('Carrito', JSON.stringify(productosCarrito));

    setNoti(true);
  }
useEffect(()=>{
  if(noti){
    const timer =setTimeout(()=>{
      setNoti(false);
    },2000)
    return(clearTimeout(timer))
  }
},[noti]);

  return (
    <div className='btn-guardar btn-alinea'>
      <button className='formulario__submit btn-carrito' onClick={EjecutarGuardarCarrito}>
        Carrito
      </button>
      {noti&&(
        <h3>Producto agregado</h3>
      )}
    </div>
  )
}