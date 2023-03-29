const Order = require('../models/Order');

const createOrder = async(req, res) => {
    try {
        const neworder = new Order(req.body);
        await neworder.save();
        res.json({success: true, message: "Usuario Creado", info: neworder})      
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getOrders = async(req, res) => {
    try {
        const orders = await Order.find();
        res.json({success: true, info: orders })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const editOrder   = async(req, res) => {
    try {
        const {id}=req.params ;
        const datos=req.body;
        const updateOrder = await Order.findByIdAndUpdate(id, datos , {new: true});
        res.json({success: true,  message: "Orden Actualizada", info: updateOrder })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const deleteOrder   = async(req, res) => {
    try {
         const {id}=req.params ;   
         const destroyedOrder = await Order.findByIdAndDelete(id);
         res.json({success: true,  message: "Orden Eliminada", info: destroyedOrder })
     } catch (error) {
         res.status(500).json({success: false, message: error.message})
     }
}

module.exports = {createOrder, getOrders, editOrder, deleteOrder};