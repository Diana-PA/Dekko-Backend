const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    sku : { type: String ,
        required: true},
    clase : { type: String,
        required: true },
    categoria : { type: String,
        required: true },
    nombre : { type: String,
            lowercase: true,
            minLength: 2,
            required: true },
    descripcion : { type: String,
        lowercase: true,
        minLength: 2,
        required: true },
    urlfoto : { type: String,
        required: true },
    urlambientacion : { type: String,
        required: true },
    stock : { type: Number ,
        required: true,
        min: [0, 'El ancho debe ser mayor 0 igual 0']  },
    ancho : { type: Number,
        required: true,
        min: [100, 'El ancho debe ser mayor o igual a 100cm']  },
    alto :  { type: Number ,
        required: true,
        min: [100, 'El alto debe ser mayor o igual a 100cm'] },
    peso : { type: Number ,
        required: true,
        min: [0.01, 'El peso debe ser mayor que 0'] },
    precio : { type: Number ,
        required: true,
        min: [1 ,'El precio debe ser mayor que 0'] }
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;