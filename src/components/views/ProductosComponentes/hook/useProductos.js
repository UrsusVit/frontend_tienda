import { useRef, useState } from 'react';
import { useApi } from '../../../../api/useApi';

export const useProductos = () => {
    const { cargando, error, setError, ejecutarPeticion } = useApi();

    // --- ESTADOS ---
    const [formulario, setFormulario] = useState({
        id: '',
        nombreProducto: '',
        descripcion: '',
        precio: ''
    });
    const [formularioVenta, setFormularioVenta] = useState({
        emailCliente: '',
        idProductos: [],
        numProducto: 0,
        totalVenta: 0,
    });

    const [imagen, setImagen] = useState(null);
    const [mensajeExito, setMensajeExito] = useState('');
    const [mensajeExito1, setMensajeExito1] = useState('');
    const fileInputRef = useRef(null);

    // NUEVO ESTADO: Para guardar el arreglo de productos que viene de la BD
    const [productos, setProductos] = useState([]);
    const [venta, setVenta] = useState([]);

    // --- MANEJADORES DE FORMULARIO ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };
    const handleChangeVenta = (e) => {
        const { name, value } = e.target;
        setFormularioVenta({ ...formularioVenta, [name]: value });
    }

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const limpiarFormulario = () => {
        setFormulario({
            id: '',
            nombreProducto: '',
            descripcionProducto: '',
            precioProducto: '',
            descripcion: '',
            precio: ''
        })
        setImagen(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const limpiarFormularioVenta = () => {
        setFormularioVenta({
            emailCliente: '',
            idProductos: '',
            numProducto: '',
            totalVenta: '',
        })
    };

    // --- FUNCIONES DE LA API ---

    const agregarProducto = async (e, onSuccess) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombreProducto', formulario.nombreProducto);
        formData.append('descripcionProducto', formulario.descripcion);
        formData.append('precioProducto', formulario.precio);
        if (imagen) formData.append('imagen', imagen);

        try {
            await ejecutarPeticion({
                method: 'POST',
                url: '/crearProducto',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setMensajeExito('¡Producto agregado correctamente!');
            limpiarFormulario();

            if (onSuccess) {
                onSuccess();
            }

            setTimeout(() => setMensajeExito(''), 3000);
        } catch (error) {
            console.error("Error capturado en useProductos");
            limpiarFormulario();
        }
    };

    // NUEVA FUNCIÓN: Traer todos los productos
    const obtenerProductos = async () => {
        try {
            const data = await ejecutarPeticion({
                method: 'GET',
                url: '/obtenerProducto'
            });
            // data es el JSON que responde tu backend con todos los productos
            setProductos(data);
        } catch (err) {
            console.error("Error al cargar los productos");
        }
    };

    const obtenerProductoId = async (e, onSuccess) => {
        e.preventDefault();

        try {
            const data = await ejecutarPeticion({
                method: 'GET',
                url: '/obtenerProductoId'
            });
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener el producto')
        }
    };

    const eliminarProductoId = async () => {
        try {
            const data = await ejecutarPeticion({
                method: 'DEL',
                url: '/eliminarProductoId'
            });
            console.log('El registro fue eliminado correctamente')
        } catch (error) {
            console.error('Error al eliminar el producto')
        }
    };

    const actualizarProducto = async (e, onSuccess) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', formulario.id);
        const idP = formulario.id

        formData.append('nombreProducto', formulario.nombreProducto);
        formData.append('descripcionProducto', formulario.descripcion);
        formData.append('precioProducto', formulario.precio);
        if (imagen) formData.append('imagen', imagen);

        try {
            setError(null);
            await ejecutarPeticion({
                method: 'PUT',
                url: `/actualizarProductoId/${idP}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setError(null)
            setMensajeExito1('¡Producto actualizado correctamente!');
            limpiarFormulario();

            if (onSuccess) {
                onSuccess();
            };

            setTimeout(() => setMensajeExito1(''), 3000);
        } catch (error) {
            setError("Error al actualizar el producto")
            console.error("Error al actualizar producto");
            limpiarFormulario();
        }
    };

    const obtenerImagenId = async () => {
        try {
            const data = await ejecutarPeticion({
                method: 'GET',
                url: '/verImagenId'
            });
            console.log('Imagen obtenida exitosamente')
        } catch (error) {
            console.error('Error al encontrar el producto')
        }
    };

    const agregarVenta = async (e, datos, onSuccess) => {
        e.preventDefault();

        const raw = {
            emailCliente: datos.emailCliente,
            idProductos: datos.idProductos,
            numProductos: datos.numProductos,
            totalVenta: datos.totalVenta
        };

        try {            
            if (
                !Array.isArray(datos.idProductos) ||
                datos.idProductos.length === 0
            ) {
                throw new Error("Sin productos");
            }

            await ejecutarPeticion({
                method: 'POST',
                url: '/crearVenta',
                data: raw,
            });

            setMensajeExito('La venta fue confirmada');
            setError('');
            limpiarFormularioVenta();

            if (onSuccess) {
                onSuccess();
            }

            setTimeout(() => setMensajeExito(''), 3000);

        } catch (error) {
            setMensajeExito('')
            setError('No se puede confirmar la venta')
            console.error("Error al confirmar compra:", error.message);            
        }
    };

    return {
        // Estados
        formulario,
        formularioVenta,
        productos,
        venta, // <-- No olvides exportarlo
        cargando,
        error,
        mensajeExito,
        mensajeExito1,
        fileInputRef,
        // Funciones
        setError,        
        handleChange,
        handleChangeVenta,
        handleImageChange,
        agregarProducto,
        obtenerProductos,
        obtenerProductoId,
        actualizarProducto,
        agregarVenta // <-- Exportamos la nueva función
    };
};