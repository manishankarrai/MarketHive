const { Stock } = require('../models/stocks');
const { Product } = require('../models/product');
const { Warehouse } = require('../models/warehouse');
const { logger } = require('../services/loggerService');

const createStock = async (req, res) => {
    try {
        const {  product_id  , warehouse_id , quantity } =  req.body ;
        let stock = await  Stock.findOne({ where: { product_id , warehouse_id }});
        if(stock){
            stock.quantity = stock.quantity +  quantity ;
            await stock.save();
        }else {
            stock = await Stock.create({  product_id  , warehouse_id , quantity });
        }
        logger.info({
            message: 'stock created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: stock , 
            sid : req.seller.id
        });
        res.status(201).json({ error: 0, data: stock, message: 'Stock created successfully' });
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

const getAllStocks = async (req, res) => {
    try {
        const { warehouse_id  } =  req.body ;
        const stocks = await Stock.findAll({
             where : { warehouse_id  },
            include: [Product, Warehouse] 
        });
        res.status(200).json({ error: 0, data: stocks, message: 'Success' });
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

const getStockById = async (req, res) => {
    try {
        const { id  }  =  req.body  ;
        const stock = await Stock.findByPk( id, {
            include: [Product, Warehouse] 
        });
        if (stock) {
            res.status(200).json({ error: 0, data: stock, message: 'Success' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Stock not found' });
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

const updateStock = async (req, res) => {
    try {
        const { id ,  product_id  , warehouse_id , quantity }  = req.body ;
        const stock = await Stock.findByPk(id);
        if (stock) {
            await stock.update( { product_id  , warehouse_id , quantity });
            logger.info({
                message: 'stock updated',
                ip: req.ip,
                method: req.method,
                url: req.url,
                data: stock , 
                sid : req.seller.id
            });
            res.status(200).json({ error: 0, data: stock, message: 'Stock updated successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Stock not found' });
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

const deleteStock = async (req, res) => {
    try {
        const { id  } =  req.body ;
        const stock = await Stock.findByPk(id);
        const deleteStock = stock ;
        if (stock) {
            await stock.destroy();
            logger.info({
                message: 'stock deleted',
                ip: req.ip,
                method: req.method,
                url: req.url,
                data: deleteStock , 
                sid : req.seller.id
            });
            res.status(200).json({ error: 0, data: null, message: 'Stock deleted successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Stock not found' });
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
    createStock,
    getAllStocks,
    getStockById,
    updateStock,
    deleteStock
};
