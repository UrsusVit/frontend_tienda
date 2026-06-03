import React from 'react';
import { Link } from 'react-router-dom';
import { GuardarCarrito } from "./guardarCarrito";

export const Producto = ({ id, nombre, precio }) => {
    // Estructuramos la petición directa al backend mediante el ID del producto
    const endpointImagen = `http://localhost:3000/api/verImagenId/${id}`;

    // Una imagen de respaldo en caso de que un registro no cuente con archivo físico
    const imagenFallback = 'https://via.placeholder.com/300x300?text=Sin+Imagen';

    return (
        <div className="producto">
            <Link to={`/producto/${id}`}>
                <img
                    className="producto__imagen"
                    src={endpointImagen}
                    alt={`Imagen de ${nombre}`}
                    // Si el servidor falla o no encuentra el archivo (404), inyecta automáticamente el fallback sin romper la UI
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = imagenFallback;
                    }}
                />
            </Link>
            <div className="producto__informacion">
                <p className="producto__nombre">{nombre}</p>
                <p className="producto__precio">
                    {String(precio).includes('$') ? precio : `$${precio}.00`}
                </p>
                <GuardarCarrito
                    id={id}
                    nombre={nombre}
                    precio={precio}
                />
            </div>


        </div>
    );
}