const express = require('express');
const {
    createStock,
    getAllStocks,
    getStockById,
    updateStock,
    deleteStock
} = require('../../controller/stocksController');

const router = express.Router();

router.post('/store', createStock);
router.get('/get', getAllStocks);
router.post('/getbyid', getStockById);
router.post('/update', updateStock);
router.post('/delete', deleteStock);

module.exports = router;
