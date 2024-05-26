const { Warehouse } = require('../models/Warehouse');
const { User } = require('../models/User');


const createWarehouse = async (req, res) => {
    try {
        const { warehouse_name  , warehouse_location } =  req.body ;
        const uid  =  req.body.id ;
        const warehouse = await Warehouse.create({ uid  , warehouse_name  , warehouse_location});
        res.status(201).json({ error: 0, data: warehouse, message: 'Warehouse created successfully' });
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

    const getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll({
            where : { uid : req.user.id } ,
            include: { model: User, as: 'user' } 
        });
        res.status(200).json({ error: 0, data: warehouses, message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const getWarehouseById = async (req, res) => {
    try {
        const { id  } =  req.body ;
        const warehouse = await Warehouse.findByPk(id, {
            include: { model: User, as: 'user' } 
        });
        if (warehouse) {
            res.status(200).json({ error: 0, data: warehouse, message: 'Success' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Warehouse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const updateWarehouse = async (req, res) => {
    try {
        const { id , warehouse_name  , warehouse_location } =  req.body ;
        const uid  =  req.body.id ;
        const warehouse = await Warehouse.findByPk(id);
        if (warehouse) {
            await warehouse.update({ uid , warehouse_name  , warehouse_location });
            res.status(200).json({ error: 0, data: warehouse, message: 'Warehouse updated successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Warehouse not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        const { id  } =  req.body ;
        const warehouse = await Warehouse.findByPk(id);
        if (warehouse) {
            await warehouse.destroy();
            res.status(200).json({ error: 0, data: null, message: 'Warehouse deleted successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Warehouse not found' });
        }
    } catch (error) {
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
