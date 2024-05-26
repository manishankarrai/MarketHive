const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { User } = require('../models/user');

const getAllCartItems = async (req, res) => {
    try {
        const { uid } = req.body;
        const cartItems = await Cart.findAll({
            where: { uid },
            include: [
                { model: Product, as: 'product' },
                { model: User, as: 'user' }
            ]
        });
        res.status(200).json({ error: 0, data: cartItems, message: "Successfull" });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};



const createCartItem = async (req, res) => {
    const { product_id, unified_id, uid, quantity } = req.body;
    try {
        const newCartItem = await Cart.create({ product_id, unified_id, uid, quantity });

        res.status(201).json({ error: 0, data: newCartItem, message: "Successfull" });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }       
};

const updateCartItem = async (req, res) => {
    const { id  , quantity } = req.body;
    try {
        const cartItem = await Cart.findByPk(id);
        if (cartItem) {
            
            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).json({ error: 0, data: cartItem, message: "Successfull" });
        } else {
            res.status(404).json({ error: 1 , data : null , message: 'Cart item not found' });
        }
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    } 
};

const deleteCartItem = async (req, res) => {
    try {
        const { id } =  req.body ;
        const cartItem = await Cart.findByPk(id);
        if (cartItem) {
            await cartItem.destroy();
            res.status(204).json({ error : 0 , data:  null , message: 'Cart item deleted' });
        } else {
            res.status(404).json( { error : 1 , data:  null ,  message: 'Cart item not found' });
        }
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    } 
};

module.exports = {
    getAllCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem
};
