const mongoose = require('mongoose');
const Product = require('./Product');
const User = require('./User');
  
const productOrderSchema = new mongoose.Schema({
idproduct:  { type: mongoose.ObjectId, ref: 'Product' },
cantidad: { 
    type: Number,
    required: true,
    min: [1, 'La cantidad debe ser mayor o igual a 1']  },
precio:  { 
    type: Number,
    required: true,
    min: [1, 'El precio debe ser mayor o igual a 1']  },
});

const orderSchema = new mongoose.Schema({
    iduser : { type: mongoose.ObjectId, ref: 'Product'},
     /* Definir si poner datos del cliente nombre,correo y telefono*/

    despacho : { type: Boolean, 
        default: false },
    
        direccionDespacho: {
            calle : { 
               type: String,
               lowercase: true, 
               minLength: 2},
            numero:  { 
               type: String,
               lowercase: true, 
               minLength: 2 },
            depto:  { 
               type: String,
               lowercase: true},
            comuna : { 
               type: String ,
               lowercase: true, 
               minLength: 2},
            ciudad : { 
               type: String,
               lowercase: true, 
               minLength: 2 },
                   },
    tipodocumento : { type: String,
                      enum: ['Boleta','Factura'],
                      required: true,
                      default: 'Boleta'},
    nrodocumento : { type: Number, 
                     required: true},
    total : { type: Number,
                     required: true,
              min: [1, 'El total debe ser mayor que 0'] },
    products : [productOrderSchema]
})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;