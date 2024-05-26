const express  = require('express');
const authRoute   =  express.Router();
const { register  , login } =  require('../controller/auth/authController');
const {  validateRegister, validateLogin } = require('../middleware/validateAuth');


authRoute.get('/test' , function(req , res){
      res.status(200).send({message: "working fine" , errro : 0  , data : null });
    });

authRoute.post('/register' , validateRegister ,  register);
authRoute.post('/login' ,  validateLogin , login);













module.exports = {  authRoute  } ;