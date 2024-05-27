const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../../controller/productController');
const { authenticateToken } = require("../../middleware/authenticateToken");

router.use(authenticateToken);

router.post('/store', createProduct);
router.get('/get', getAllProducts);
router.post('/getbyid', getProductById);
router.post('/update', updateProduct);
router.post('/delete', deleteProduct);



module.exports = router;
