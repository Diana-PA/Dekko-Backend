const { expressjwt } = require('express-jwt');
require('dotenv').config();

const getToken = (req) => {
    const { authorization } = req.headers;

    if(authorization){
        const [type, token] = authorization.split(' ');
        return type === 'Bearer' ? token : null;
    }

    return null;
}

const auth = expressjwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken
}) 

module.exports = auth;

/*
Tarea: delete debe eliminar usuarios a traves de id que proviene del token, ademas en el controlador de productos deben crear el editProduct , deleteProduct y getProduct , añadiendo si sea pertinente el middleware visto en clases.
*/
