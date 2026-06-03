import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
export const DetalleProducto = () => {
    const { id } = useParams(); 
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        
       
        const productoEncontrado = productosGuardados.find(p => p.id.toString() === id);
        
    
        setProducto(productoEncontrado);
    }, [id]);


    if (!producto) {
        return (
            <main className="contenedor">
                <h1 style={{marginTop: '5rem'}}>Producto no encontrado</h1>
            </main>
        );
    }


    return (
        <main className="contenedor">
            <h1>{producto.nombre}</h1>

            <div className="camisa">
                <img 
                    className="camisa__imagen" 
                    src={producto.imgUrl} 
                    alt={`Imagen de ${producto.nombre}`} 
                />

                <div className="camisa__contenido">
                    <p>
                        Esta es una descripción del producto {producto.nombre}. 
                        Pronto podrías agregar un campo en tu formulario para que 
                        cada producto tenga una descripción única.
                    </p>

                    <form className="formulario">
                        <select className="formulario__campo" defaultValue="">
                            <option value="" disabled>-- Seleccionar Talla --</option>
                            <option value="PT">Pequeña</option>
                            <option value="MD">Mediana</option>
                            <option value="GD">Grande</option>
                        </select>

                        <input 
                            className="formulario__campo" 
                            type="number" 
                            placeholder="Cantidad" 
                            min="1" 
                            defaultValue="1"
                        />

                        <input 
                            className="formulario__submit" 
                            type="submit" 
                            value={`Agregar al Carrito - ${String(producto.precio).includes('$') ? producto.precio : `$${producto.precio}`}`} 
                        />
                    </form>
                </div>
            </div>
        </main>
    );
}