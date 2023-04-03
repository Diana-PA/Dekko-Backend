
//* importacion de la Referencia sobre la coleccion con su esquema determinado.
const User = require('../models/User');
const crypto = require('crypto');



const createUser = async(req, res) => {
    try {
        const userCorreo = await User.findOne({ correo: req.body.correo })
        if(userCorreo) {
            throw new Error('correo en uso!!!')
        }
        //* Guardar informacion en mi base de datos
        const newUser = new User(req.body);
        newUser.hashPassword(req.body.password);
        await newUser.save();
        res.json({success: true, message: "Usuario Creado", info: newUser._id, token: newUser.generateToken()})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


const getUsers = async(req, res) => {
    try {
        //const users = await User.find().populate('favoriteProducts');
        const users = await User.find();
        res.json({success: true, info: users })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

 
const editUser = async(req, res) => {

    try {
        // throw new Error('error forzado')
        const {id} = req.auth;
        const contain = req.body;
 
        const usuario = await User.find({ correo: contain.correo})
 
        const updateUser = await User.findByIdAndUpdate(id,  {
            nombre: contain.nombre,
            telefono: contain.telefono,
            calle: contain.calle,
            numero: contain.numero,
            depto: contain.depto,
            comuna: contain.comuna,
            ciudad: contain.ciudad
        });
        res.json({success: true, msg: "usuario actualizado", updateUser})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const updatePassword = async(req, res) => {
        try {
            const {correo, password , npassword} = req.body;
            const user = await User.findOne({ correo })
            if(!user){
                throw new Error('Usuario no registrado')
            }
            const validatePassword = user.hashValidation(password, user.salt, user.password)
            if(!validatePassword){
                throw new Error('Correo o contraseña incorrecta')
            }
            user.hashPassword(npassword);
            let userid=user.id;
            const updateUser = await User.findByIdAndUpdate( userid, {
                password: user.password,
                salt: user.salt
            });
            res.json({success: true, msg: 'Contraseña modificada con exito', token: user.generateToken()})
        } catch (error) {
            res.status(500).json({success: false, message: error.message})
        }
}


const deleteUser =  async(req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const destroyUser = await User.findByIdAndRemove(id);
        res.json({success: true, msg: "usuario eliminado", destroyUser})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const login = async(req, res) => {
    try {
        const { correo, password } = req.body;
        console.log(correo, password,req.body )
        const user = await User.findOne({ correo })
        console.log(user)
        if(!user){
            throw new Error('Usuario no registrado!!!')
        }
        const validatePassword = user.hashValidation(password, user.salt, user.password)
        if(!validatePassword){
            throw new Error('correo o contraseña incorrecta!!!')
        }
        res.json({success: true, msg: 'Has iniciado sesion', token: user.generateToken()})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


const getUserVerify = async(req, res) => {
    try {
        const { id } = req.auth
       // const user = await User.findById(id).populate('favoriteProducts').select('-password -salt');
        const user = await User.findById(id).select('-password -salt');
        res.json({success: true, msg: `Informacion de: ${user.correo}`, info: user })

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}


module.exports = {createUser, getUsers, editUser, deleteUser, login, getUserVerify, updatePassword};