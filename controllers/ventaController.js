const venta=require('../models/venta');
const fs=require('fs');
const path=require('path');

const ventaController={}

ventaController.crearVenta=async(req, res)=>{
    try{
        console.log(req.body)
        const{emailCliente, idProductos, numProductos, totalVenta}=req.body;
        const horaFecha=new Date();

        const nuevaVenta=new venta({
            emailCliente,
            idProductos,
            numProductos,
            totalVenta,
            horaFecha
        });

        await nuevaVenta.save();

        res.status(201).json({message: 'Venta creada exitosamente'})
    }catch(error){
        res.status(500).json({error: 'Error al crear la venta'})
    }
}

module.exports=ventaController;