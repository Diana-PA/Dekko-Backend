const express = require('express');
const {createUser, getUsers, editUser, deleteUser, login}  = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route('/user')
    .post(createUser)
    .get(getUsers)
userRouter.route('/user/:id')
    .post(editUser)
    .delete(deleteUser)
userRouter.route('/user/login')
    .post(login)
 
 

module.exports = userRouter;