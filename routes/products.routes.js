const express = require('express');
const {createProduct, getProducts, editProduct, deleteProduct}  = require('../controllers/product.controller') 

const productRouter = express.Router();

productRouter.route('/product')
    .post(createProduct)
    .get(getProducts)
productRouter.route('/Product/:id')
    .post(editProduct)
    .delete(deleteProduct)

module.exports = productRouter;
