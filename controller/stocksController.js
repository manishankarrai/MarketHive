const { Stock } = require('../models/Stock');
const { Product } = require('../models/Product');
const { Warehouse } = require('../models/Warehouse');

const createStock = async (req, res) => {
    try {
        const {  product_id  , warehouse_id , quantity } =  req.body ;
        const stock = await Stock.create({  product_id  , warehouse_id , quantity });
        res.status(201).json({ error: 0, data: stock, message: 'Stock created successfully' });
    } catch (error) {
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
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const updateStock = async (req, res) => {
    try {
        const { id ,  product_id  , warehouse_id , quantity }  = req.body ;
        const stock = await Stock.findByPk(id);
        if (stock) {
            await stock.update( { product_id  , warehouse_id , quantity });
            res.status(200).json({ error: 0, data: stock, message: 'Stock updated successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Stock not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const deleteStock = async (req, res) => {
    try {
        const { id  } =  req.body ;
        const stock = await Stock.findByPk(id);
        if (stock) {
            await stock.destroy();
            res.status(200).json({ error: 0, data: null, message: 'Stock deleted successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Stock not found' });
        }
    } catch (error) {
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
