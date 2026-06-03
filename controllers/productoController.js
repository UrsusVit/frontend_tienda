const producto=require('../models/producto')
const fs=require('fs');
const path=require('path');

const productoController={}

productoController.crearProducto=async(req, res)=>{
    try{
        const{nombreProducto, descripcionProducto, precioProducto}=req.body;

        let imgUrl='';

        if(req.file){
            imgUrl=`/uploads/${req.file.filename}`;
        }

        const nuevoProducto=new producto({
            nombreProducto,
            descripcionProducto,
            precioProducto,
            imgUrl
        });
        
        await nuevoProducto.save();

        res.status(201).json({message: 'Producto creado exitosamente'})
    }catch(error){
        res.status(500).json({error: 'Error al crear el producto'})
    }
}

productoController.obtenerProducto=async(req, res)=>{
    try{
        console.log('Obteniendo los productos...')
        const productos=await producto.find();
        if(!productos){
            console.log('Sin productos en existencia')
        }
        res.status(200).json(productos);
    }catch(error){
        console.error('Error al obtener los productos', error);
        res.status(500).json({error:'Error al obtener los productos'});
    }
}

productoController.obtenerProductoId=async(req, res)=>{
    try{
        const {id}=req.params;
        const productoEncontrado=await producto.findById(id);
        if(!productoEncontrado){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.status(200).json(productoEncontrado);
    }catch(error){
        console.error('Error al obtener el producto: ', error);
        res.status(500).json({error: 'Error al obtener el producto'})
    }
}

productoController.eliminarProductoId=async(req, res)=>{
    try{
        const {id}=req.params;
        const productoEliminar=await producto.findByIdAndDelete(id);
        if(!productoEliminar){
            return res.status(404).json({error: 'Producto no encontrado'});
        }
        res.status(200).json({mensaje: `Producto eliminado: ${id}`});
    }catch(error){
        console.error('Error al eliminar el producto', error);
        res.status(500).json({error: 'Error al eliminar el producto'})
    }
}

productoController.actualizarProductoId=async(req, res)=>{
    try{
        const {id}=req.params;
        const{nombreProducto, descripcionProducto, precioProducto}=req.body;

        const productoActualizar=await producto.findById(id);        

        const actualizacion=productoActualizar;
        actualizacion.nombreProducto=nombreProducto;
        actualizacion.descripcionProducto=descripcionProducto;
        actualizacion.precioProducto=precioProducto;
        
        if(req.file){
            actualizacion.imgUrl=`/uploads/${req.file.filename}`;
        }
        
        await actualizacion.save();

        res.status(200).json({message: `Producto actualizado exitosamente: ${_id}`})
    }catch(error){
        console.error('Error al actualizar el producto')
        res.status(500).json({error: 'Error al actualizar el producto'})
    }
}

productoController.verImagenId=async(req, res)=>{
    try{
        const {id}=req.params;
        const visImagen=await producto.findById(id);

        const imagen=path.join(__dirname, '..', visImagen.imgUrl);
        if(imagen==null){
            return status(404).json({error: 'Producto sin imágen'})
        }else{
        res.sendFile(imagen);
    }
    }catch(error){
        console.error('Error al encontrar su imágen')
        res.status(500).json({error: 'No se encontro imágen'})
    }
}

module.exports=productoController;