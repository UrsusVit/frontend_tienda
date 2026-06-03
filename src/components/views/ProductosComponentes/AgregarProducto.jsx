import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductos } from '../ProductosComponentes/hook/useProductos';

export const AgregarProducto = () => {
    const navigate = useNavigate();

    const {
        formulario,
        cargando,
        error,
        mensajeExito,
        mensajeExito1,
        fileInputRef,
        setError,
        handleChange,
        handleImageChange,
        agregarProducto,
        actualizarProducto
    } = useProductos();


    useEffect(() => {
        if (mensajeExito || mensajeExito1) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [mensajeExito, mensajeExito1, navigate]);

    return (
        <main className="contenedor">
            <h1>Agregar Nuevo Producto</h1>

            <div className="formulario-tarjeta">

                {mensajeExito && (<div className="alerta-exito">{mensajeExito}</div>)}
                {error && (<div className="alerta-error">{error}</div>)}

                {/* 3. Cambiamos handleSubmit por agregarProducto que viene del hook */}
                <form className="formulario-admin" onSubmit={agregarProducto}>

                    <div className="campo-grupo">
                        <label>Nombre del Producto:</label>
                        <input
                            className="formulario__campo"
                            type="text"
                            name="nombreProducto"
                            placeholder="Camisa React"
                            value={formulario.nombreProducto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Descripción del Producto:</label>
                        <input
                            className="formulario__campo"
                            name="descripcion"
                            placeholder="Breve descripción del producto"
                            value={formulario.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Precio (MXN):</label>
                        <input
                            className="formulario__campo"
                            type="number"
                            name="precio"
                            placeholder="250"
                            value={formulario.precio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo ancho-completo">
                        <label>Imagen del Producto:</label>
                        <input
                            ref={fileInputRef}
                            className="formulario__submit btn-guardar"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <input
                        className="formulario__submit btn-guardar"
                        type="submit"
                        value={cargando ? "Guardando en BD..." : "Guardar Producto"}
                        disabled={cargando}
                    />
                </form>
            </div>

            <h1>Actualizar Producto</h1>
            <div className='formulario-tarjeta'>

                {mensajeExito1 && error==null && (<div className="alerta-exito">{mensajeExito1}</div>)}
                {error!==null && (<div className="alerta-error">{error}</div>)}

                <form className="formulario-admin" onSubmit={actualizarProducto}>
                    <div className="campo-grupo">
                        <label>ID único:</label>
                        <input
                            className="formulario__campo"
                            type="text"
                            name="id"
                            placeholder="6a15f81d51ee0b49d6d370a6"
                            value={formulario.id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Nombre del Producto:</label>
                        <input
                            className="formulario__campo"
                            type="text"
                            name="nombreProducto"
                            placeholder="Camisa React"
                            value={formulario.nombreProducto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Descripción del Producto:</label>
                        <input
                            className="formulario__campo"
                            type="text"
                            name="descripcion"
                            placeholder="Breve descripción del producto"
                            value={formulario.descripcionProducto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo">
                        <label>Precio (MXN):</label>
                        <input
                            className="formulario__campo"
                            type="number"
                            name="precio"
                            placeholder="250"
                            value={formulario.precioProducto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo-grupo ancho-completo">
                        <label>Imagen del Producto:</label>
                        <input
                            ref={fileInputRef}
                            className="formulario__submit btn-guardar"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <input
                        className="formulario__submit btn-guardar"
                        type="submit"
                        value={cargando ? "Actualizando..." : "Actualizar producto"}
                    />
                </form>
            </div>
        </main>
    );
}