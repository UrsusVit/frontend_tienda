import React from 'react'

export const ListaCarrito = ({ id, nombre, cantidad, precio, actualizarCarrito }) => {

  const endpointImagen = `http://localhost:3000/api/verImagenId/${id}`;
  const imagenFallback = 'https://via.placeholder.com/300x300?text=Sin+Imagen';

  const eliminarProducto = (e) => {
    e.preventDefault();

    const productosCarrito = JSON.parse(localStorage.getItem('Carrito')) || [];
    const index = productosCarrito.findIndex(
      (producto) => producto.id === id
    );

    if (index !== -1) {
      if (productosCarrito[index].cantidad > 1) {
        productosCarrito[index].cantidad -= 1;
      } else {
        productosCarrito.splice(index, 1);
      }
      localStorage.setItem('Carrito', JSON.stringify(productosCarrito));
      actualizarCarrito();
    }
  };

  const agregarConteo = (e) => {
    e.preventDefault();

    const productosCarrito = JSON.parse(localStorage.getItem('Carrito')) || [];
    const index = productosCarrito.findIndex(
      (producto) => producto.id === id
    );

    if (index !== -1) {
      productosCarrito[index].cantidad += 1;
    }
    localStorage.setItem('Carrito', JSON.stringify(productosCarrito));
    actualizarCarrito();
  }

  return (
    <tr>
      <th className=''>
        <button className='btn-mm' onClick={agregarConteo}>
          +
        </button>
        <button className='btn-mm' onClick={eliminarProducto}>
          -
        </button>
      </th>
      <th className=''>
        <img
          className="formulario__campo"
          src={endpointImagen}
          alt={`Imagen de ${nombre}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = imagenFallback;
          }}
        />
      </th>
      <th className='celda-contenido'>{id}</th>
      <th className='celda-contenido'>{nombre}</th>
      <th className='celda-contenido'>{cantidad}</th>
      <th className='celda-contenido'>$ {precio}.00</th>
    </tr>
  )
}