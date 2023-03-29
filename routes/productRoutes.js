const express = require('express');
const {createProduct, getProducts, editProduct, deleteProduct}  = require('../controllers/product.controller') 
const auth = require('../middleware/auth') 
const productRouter = express.Router();

productRouter.route('/product')
    .post(auth,createProduct)
    .get(getProducts)
productRouter.route('/Product/:id')
    .post(auth,editProduct)
    .delete(auth,deleteProduct)

module.exports = productRouter;
