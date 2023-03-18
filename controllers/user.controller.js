const User = require('../models/Users');
 
const createUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({success: true, message: "Usuario Creado", info: newUser})  
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json({success: true, info: users })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const editUser   = async(req, res) => {
    try {
        const {id}=req.params ;
        const datos=req.body;
        const updateUser = await User.findByIdAndUpdate(id, datos , {new: true});
        res.json({success: true,  message: "Usuario Actualizado", info: updateUser })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const deleteUser   = async(req, res) => {
    try {
         const {id}=req.params ;
         const destroyedUser = await User.findByIdAndDelete(id);
         res.json({success: true,  message: "Usuario Eliminado", info: destroyedUser })
     } catch (error) {
         res.status(500).json({success: false, message: error.message})
     }
}

module.exports = {createUser, getUsers,  editUser, deleteUser};