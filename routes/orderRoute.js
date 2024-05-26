const express = require('express');
const {  createOrderWithDetails , applyCoupon  } = require('../controller/orderController');

const router = express.Router();



router.post('/checkout', createOrderWithDetails);
router.get('/applycoupon', applyCoupon );



module.exports = router;
