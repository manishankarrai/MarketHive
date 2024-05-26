const express = require('express');
const {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
} = require('../../controller/warehouseController');

const router = express.Router();

router.post('/store', createWarehouse);
router.get('/get', getAllWarehouses);
router.post('/getbyid', getWarehouseById);
router.post('/update', updateWarehouse);
router.post('/delete', deleteWarehouse);

module.exports = router;
