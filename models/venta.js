const { Schema, model } = require('mongoose');

const ventaSchema = new Schema({
    emailCliente: {
        type: String,
        required: true
    },
    idProductos: {
        type: [String],
        required: true
    },
    numProductos: {
        type: Number,
        required: true
    },
    totalVenta: {
        type: Number,
        required: true
    },
    horaFecha:{
        type:Date,
        required:true
    }
});

module.exports = model('venta', ventaSchema)