const express = require('express');
const {createProduct, getProducts, editProduct, deleteProduct, getProductById, reducirStock}  = require('../controllers/product.controller') 
const auth = require('../middleware/auth') 
const productRouter = express.Router();

productRouter.route('/product')
    .post(auth,createProduct)
    .get(getProducts)
productRouter.route('/product/:id')
    .put(auth,editProduct)
    .delete(auth,deleteProduct)
    .get(getProductById)
productRouter.route('/product/reduce_stock')
    .put(reducirStock)

module.exports = productRouter;
