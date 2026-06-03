import React, { useEffect } from 'react';
import { Producto } from './Producto';
// Importamos tu custom hook (ajusta la ruta según tu estructura de carpetas)
import { useProductos } from '../ProductosComponentes/hook/useProductos';
import { GuardarCarrito } from './guardarCarrito';


export const ContenidoHome = () => {
    // Extraemos el arreglo de productos, el método GET y el estado de carga
    const { productos, obtenerProductos, cargando, error } = useProductos();

    // Ejecutamos la consulta a la API al montar el componente
    useEffect(() => {
        obtenerProductos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="contenedor">
            <h1>Nuestros Productos</h1>

            {/* Mostramos un indicador visual si la petición está en camino */}
            {cargando && <p className="text-center">Cargando catálogo de productos...</p>}

            {/* Mostramos el error si es que el Backend no responde */}
            {error && <div className="alerta-error">{error}</div>}

            <div className="grid">
                {/* Mapeamos los productos que vienen de MongoDB */}
                {!cargando && productos.map((producto) => (
                    <Producto
                        key={producto._id}       // MongoDB usa '_id'
                        id={producto._id}        // Pasamos el identificador único para la ruta dinámica
                        nombre={producto.nombreProducto} // Mapeado al campo de tu Schema
                        precio={producto.precioProducto}
                    />
                ))};
            </div>

            {/* Mensaje amigable en caso de catálogo vacío */}
            {!cargando && productos.length === 0 && !error && (
                <p className="text-center">No hay productos registrados en la tienda actualmente.</p>
            )}
        </main>
    );
}