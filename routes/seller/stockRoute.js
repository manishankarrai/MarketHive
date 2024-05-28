const express = require('express');
const {
    createStock,
    getAllStocks,
    getStockById,
    updateStock,
    deleteStock
} = require('../../controller/stocksController');
const { authenticateSellerToken } = require("../../middleware/authenticateToken");

const router = express.Router();

router.use(authenticateSellerToken);

router.post('/store', createStock);
router.get('/get', getAllStocks);
router.post('/getbyid', getStockById);
router.post('/update', updateStock);
router.post('/delete', deleteStock);

module.exports = router;
