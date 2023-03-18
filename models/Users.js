const mongoose = require('mongoose');
const Product = require('../models/Products');
 
const productCarritoSchema = new mongoose.Schema({
    idproduct:  { type: mongoose.ObjectId, ref: 'Product' },
    cantidad: { 
        type: Number,
        required: true,
        min: [1, 'La cantidad debe ser mayor o igual a 1']  }
    });
        
const userSchema = new mongoose.Schema({
    rut : { type: Number,
            match: [/\b[0-9|.]{1,10}\-[K|k|0-9]/gmi] },
    nombre : { type: String,
               lowercase: true,
               minLength: 2,
               required: true },
    correo : { type: String ,
               trim: true,
               required: true,
               match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]},
    telefono : { type: Number ,
                 match: [/D*([+56]\d [2-9])(\D)(\d{4})(\D)(\d{4})\D*/g] },
    clave : { type: String},
    recuperacion : { type: String  },
    direccion: {
             calle : { 
                type: String,
                trim: true,
                uppercase: true, 
                minLength: 2},
             numero:  { 
                type: String,
                trim: true,
                uppercase: true, 
                minLength: 1 },
             depto:  { 
                type: String,
                trim: true,
                uppercase: true},
             comuna : { 
                type: String ,
                lowercase: true, 
                minLength: 2},
             ciudad : { 
                type: String,
                lowercase: true, 
                minLength: 2 },
                    },
    isAdmin : { type: Boolean,
                default: false },
    carrito : [productCarritoSchema],
    })

const User = mongoose.model('user', userSchema);

module.exports = User;