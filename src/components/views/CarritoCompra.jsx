import React from 'react';
import { useState, useEffect } from 'react';
import { ListaCarrito } from './CarritoComponents/ListaCarrito';
import { useProductos } from './ProductosComponentes/hook/useProductos';

export const CarritoCompra = () => {
    const {
        formularioVenta,
        cargando,
        mensajeExito,
        error,
        handleChangeVenta,
        agregarVenta
    } = useProductos();

    const [productos, setProductos] = useState([]);

    useEffect(()=>{
        if(error){
            const timer=setTimeout(()=>setError('', 3000));
            return ()=>clearTimeout(timer);
        }
    })

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Carrito')) || [];
        setProductos(data);
    }, []);

    const actualizarCarrito = () => {
        const data = JSON.parse(localStorage.getItem('Carrito')) || []
        setProductos(data);
    }

    const totalC = productos.reduce(
        (acc, p) => acc + p.cantidad,
        0
    )
    const totalP = productos.reduce(
        (acc, p) => acc + (p.precio * p.cantidad),
        0
    )

    const confirmarCompra = (e) => {
        e.preventDefault();

        const idCadena = productos.flatMap(p =>
            Array(p.cantidad).fill(p.id)
        );

        agregarVenta(e, {
            ...formularioVenta,
            idProductos: idCadena,
            numProductos: parseInt(totalC),
            totalVenta: parseInt(totalP)
        },
            () => {
                localStorage.setItem('Carrito', JSON.stringify([]));
                setProductos([]);
            }
        )
    }

    return (
        <main className='contenedor'>
            <h1>Carrito de Compras</h1>
            <div className='formulario-tarjeta'>
                <form className='' onSubmit={confirmarCompra}>
                    <table className='table'>
                        <thead className=''>
                            <tr className=''>
                                <th className='celda encabezado'> </th>
                                <th className='celda encabezado'>Imagen</th>
                                <th className='celda encabezado'>Código</th>
                                <th className='celda encabezado'>Nombre</th>
                                <th className='celda encabezado'>Unidades</th>
                                <th className='celda encabezado'>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            {productos.map((producto) => (
                                <ListaCarrito
                                    key={producto.id}
                                    id={producto.id}
                                    nombre={producto.nombre}
                                    cantidad={producto.cantidad}
                                    precio={producto.precio}
                                    actualizarCarrito={actualizarCarrito}
                                />
                            ))}
                        </tbody>
                        <tr>
                            <th className='celda'> </th>
                            <th className='celda'> </th>
                            <th className='celda'> </th>
                            <th className='celda encabezado'>Total</th>
                            <th className='celda encabezado'>{totalC}</th>
                            <th className='celda encabezado'>$ {totalP}.00</th>
                        </tr>
                    </table>
                    <div className='campo-grupo ancho completo'>
                        <label>Correo eléctronico</label>
                        <input
                            className='formulario__campo'
                            type="email"
                            name='emailCliente'
                            value={formularioVenta.emailCliente}
                            onChange={handleChangeVenta}
                            placeholder='direccion@dominio.com'
                            required
                        />
                        <input
                            className='formulario__submit btn-guardar'
                            type="submit"
                            value={cargando ? "Confirmando..." : "Confirmar compra"}
                            disabled={cargando}
                        />
                    </div>
                </form>
                {mensajeExito && (<div className="alerta-exito espacio-alerta">{mensajeExito}</div>)}
                {error && (<div className="alerta-error espacio-alerta">{error}</div>)}
            </div>
        </main>
    )
}