const { Warehouse } = require('../models/warehouse');
const { Seller } = require('../models/seller');
const { logger } =  require('../services/loggerService');

const createWarehouse = async (req, res) => {
    try {
        const { warehouse_name, warehouse_location } = req.body;
        const sid = req.seller.id;
        const warehouse = await Warehouse.create({ sid, warehouse_name, warehouse_location });
        logger.info({
            message: 'warehouse created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: warehouse
        });
        res.status(201).json({ error: 0, data: warehouse, message: 'Warehouse created successfully' });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            sid: req.seller.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll({
            where: { sid: req.seller.id },
            include: { model: Seller, as: 'seller' }
        });
        res.status(200).json({ error: 0, data: warehouses, message: 'Success' });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            sid: req.seller.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const getWarehouseById = async (req, res) => {
    try {
        const { id } = req.body;
        const warehouse = await Warehouse.findByPk(id, {
            include: { model: Seller, as: 'seller' }
        });
        if (warehouse) {
            res.status(200).json({ error: 0, data: warehouse, message: 'Success' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Warehouse not found' });
        }
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            sid: req.seller.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const updateWarehouse = async (req, res) => {
    try {
        const { id, warehouse_name, warehouse_location } = req.body;
        const sid = req.body.id;
        const warehouse = await Warehouse.findByPk(id);
        if (warehouse) {
            await warehouse.update({ sid, warehouse_name, warehouse_location });
            logger.info({
                message: 'warehouse updated',
                ip: req.ip,
                method: req.method,
                url: req.url,
                data: warehouse
            });
            res.status(200).json({ error: 0, data: warehouse, message: 'Warehouse updated successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Warehouse not found' });
        }
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            sid: req.seller.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.body;
        const warehouse = await Warehouse.findByPk(id);
        const warehouse_id = warehouse.id;
        if (warehouse) {
            await warehouse.destroy();
            logger.info({
                message: 'warehouse created',
                ip: req.ip,
                method: req.method,
                url: req.url,
                data: warehouse_id
            });
            res.status(200).json({ error: 0, data: null, message: 'Warehouse deleted successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Warehouse not found' });
        }
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            sid: req.seller.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

module.exports = {
    createWarehouse,
    getAllWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};
