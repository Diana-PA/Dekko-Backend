const express = require('express');
const {createOrder, getOrders, editOrder,deleteOrder }  = require('../controllers/order.controller') 

const orderRouter = express.Router();

orderRouter.route('/order')
    .post(createOrder)
    .get(getOrders)
orderRouter.route('/order/:id')
    .post(editOrder)
    .delete(deleteOrder)

module.exports = orderRouter;