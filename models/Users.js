const mongoose = require('mongoose');
const Product = require('../models/Products');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
 
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
               minLength: 2 },
    correo : { type: String ,
               trim: true, 
               match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]},
    telefono : { type: Number ,
                 match: [/D*([+56]\d [2-9])(\D)(\d{4})(\D)(\d{4})\D*/g] },
    password : { type: String},
    salt : { type: String},
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

   
userSchema.methods.hashPassword = function (password)
{
   this.salt = crypto.randomBytes(10).toString('hex'); //Salt de cada usuario
   this.password  =  crypto.pbkdf2Sync( password, this.salt, 5000, 10, 'sha-512').toString('hex');
   console.log( this.password );
}

userSchema.methods.hashValidation = function (password, salt, passwordBD)
{
   const hash  = crypto.pbkdf2Sync( password, salt, 5000, 10, 'sha-512').toString('hex');
   return hash === passwordBD;
}



userSchema.methods.generateToken = function (){
   const payload ={
      id: this._id,
      nombre: this.name,
      correo: this.email
   }
   const token = jwt.sign(payload, process.env.SECRET, {expiresIn: 900000});
   return token;
}

const User = mongoose.model('user', userSchema);

module.exports = User;