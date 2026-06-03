const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    descripcionProducto: {
        type: String,
        required: false
    },
    precioProducto: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})

module.exports = model('producto', productoSchema);