const express  = require('express');
const router  =  express.Router();
const adminAuth  =  require('./admin/authRoute');

router.use('/admin' , adminAuth );


module.exports =  router ;