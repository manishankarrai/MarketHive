const express =  require('express');
const router  =  express.Router();
const {
    getAllCartItems,
    getCartItemById,
    createCartItem,
    updateCartItem,
    deleteCartItem
  } = require('../../controller/cartController');


router.get('/get', getAllCartItems);
router.post('/store', createCartItem);
router.post('/update', updateCartItem);
router.post('/delete', deleteCartItem);


module.exports = router ;