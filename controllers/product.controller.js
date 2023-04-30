const Product = require('../models/Product');

const createProduct = async(req, res) => {
    try {
        const newproduct = new Product(req.body);
        await newproduct.save();
        res.json({success: true, message: "Producto Creado", info: newproduct})          
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.json({success: true, info: products })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
const editProduct   = async(req, res) => {
    try {
        const {id}=req.params ;
        const datos=req.body;
        const updateProduct = await Product.findByIdAndUpdate(id, datos , {new: true});
        res.json({success: true,  message: "Producto Actualizado", info: updateProduct })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const deleteProduct   = async(req, res) => {
    try {
         const {id}=req.params ;
         const destroyedProduct = await Product.findByIdAndDelete(id);
         res.json({success: true,  message: "Producto Eliminado", info: destroyedProduct })
     } catch (error) {
         res.status(500).json({success: false, message: error.message})
     }
}

const getProductById = async (req, res) => {
    
    const {id}=req.params ;
    
    try {
        const product = await Product.findById(id)
        res.json({success:true, message: "Producto obtenido", info: product})
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const reducirStock = async (req, res) => {

    //volver aca cuando el carrito esté listo
    const productosComprados = req.body 
    try {
        productosComprados.map(async(productoComprado)=> {
            await Product.findByIdAndUpdate(productoComprado._id, {stock: productoComprado.stock - productoComprado.quantity})
        })
        res.json({success: true, message: "El stock se ha reducido"})
    } catch (error) {
        res.status(500).json({success: false, message: "hubo un error"})
    }

}

module.exports = {createProduct, getProducts , editProduct, deleteProduct, getProductById, reducirStock};
 