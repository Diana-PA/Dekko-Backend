const User = require('../models/Users');

const crypto=require('crypto');

const createUser = async(req, res) => {
    try {

        // Verificar si existe
        const userEmail=await User.findOne({ correo: req.body.correo }) 
        if (userEmail )
        { throw new Error('Email en uso!!');
        }
        const newUser = new User( req.body );
        newUser.hashPassword(req.body.password);
        await newUser.save();
        res.json ({success: true, message: 'Usuario Creado', info: newUser.password, token: newUser.generateToken()});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
 
const login = async(req, res) => {
    try {
        const {correo, password}=req.body ;
        const user=await User.findOne({correo}) 
        if (!user)
        { throw new Error('user no registrado!!');
        }
       const validatePassword = false //User.hashValidation  (password, user.salt,  user.password);

        if (!validatePassword)
        { throw new Error('email o contraseña invalida!!');
        }
        res.json ({success: true, message: 'Has iniciado sesion', info: user._id, token: user.generateToken()});
 
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
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

const getVerifiedUser = async() => {
    try {
        //const {} = req.auth;
        res.json({success: true })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const editUser   = async(req, res) => {
    try {
        const {id}=req.params ;
        const datos=req.body;
        const updateUser = await User.findByIdAndUpdate(id, datos , {new: true});
        res.json({success: true,  message: "user Actualizado", info: updateUser })
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}



const deleteUser   = async(req, res) => {
    try {
         const {id}=req.params ;
         const destroyedUser = await User.findByIdAndDelete(id);
         res.json({success: true,  message: "user Eliminado", info: destroyedUser })
     } catch (error) {
         res.status(500).json({success: false, message: error.message})
     }
}

module.exports = {createUser, getUsers,  editUser, deleteUser,  login, getVerifiedUser};