const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../../controller/productController');
const { authenticateSellerToken } = require("../../middleware/authenticateToken");

router.post('/store', authenticateSellerToken , createProduct);
router.get('/get', getAllProducts);
router.post('/getbyid', getProductById);
router.post('/update', authenticateSellerToken , updateProduct);
router.post('/delete', authenticateSellerToken , deleteProduct);



module.exports = router;
