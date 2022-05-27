const express = require ("express");
const user = express.Router();

const {signUp, signIn, updateUser, getOneUser, getUsers, deleteUser, banUser} = require ('../../Controllers/userControllers/user.controllers');
const {isAuth} = require ("../../Middlewares/Auth")

user.post ('/signUp',signUp);
user.post ('/signIn',signIn);
user.get ('/current', isAuth, (req,res)=>{res.send({user:req.user})})
user.put ('/updateUser/:id',updateUser);
user.get ('/getOneUser/:id', getOneUser);
user.get ('/getUsers', getUsers);
user.delete ('/deleteUsers/:id', deleteUser);
user.patch ('/banUser/:id', banUser);

module.exports = user