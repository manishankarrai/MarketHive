const { Product } = require('../models/product');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const { SubCategory } = require('../models/subCategory');
const { logger } = require('../services/loggerService');
const { generateSEOTitle } = require('../services/commanFunction');
const { createUploader } =  require('../services/uploadFile');
const util = require('util');



const createProduct  =  async  (req, res)=> {
    try {

        const upload  = await  createUploader('../public/gallery/products' , 'product_thumbnail' );

        const uploadPromise = util.promisify(upload);
        await uploadPromise(req, res);

        let product_thumbnail = req.file ? req.file.filename : null;

        const {  category_id, subcategory_id, product_name, product_price, product_short_info } = req.body;
        const uid =  req.user.id ;
        const product_seo = generateSEOTitle(product_name);
        const product = await Product.create({
            uid,
            category_id,
            subcategory_id,
            product_name,
            product_seo,
            product_thumbnail,
            product_price,
            product_short_info
        });
        logger.info({
            message: 'subcategory created',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: product
        });
        res.status(201).json({ error: 0, data: product, message: 'Created Successfully' });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            uid: req.user.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
}

const getAllProducts  = async  (req, res)=> {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ['deletedAt'] },
            include: [
                { model: Category, attributes: ['id', 'category_name'] },
                { model: SubCategory, attributes: ['id', 'subcategory_name'] },
                { model: User, attributes: ['id', 'username'] }
            ]
        });
        res.status(200).json({ error: 0, data: products, message: ' Successfull' });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            uid: req.user.id,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
}

const getProductById  =  async  (req, res)=> {
    try {
        const { id } = req.body;
        const product = await Product.findByPk(id, {
            attributes: { exclude: ['deletedAt'] },
            include: [
                { model: Category, attributes: ['id', 'category_name'] },
                { model: SubCategory, attributes: ['id', 'subcategory_name'] },
                { model: User, attributes: ['id', 'username'] }
            ]
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found', error: 1 });
        }
        res.status(200).json({ error: 0, data: product, message: ' Successfull' });

    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            uid : req.user.id ,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1,data: null ,  message: error.message });
      }
}

const updateProduct  =  async  (req, res)=> {
    try {
        const upload  = await  createUploader('../public/gallery/products' , 'product_thumbnail' );

        const uploadPromise = util.promisify(upload);
        await uploadPromise(req, res);
        
        let product_thumbnail = req.file ? req.file.filename : null;
        const {id , product_name , product_price, product_short_info } = req.body;
        const product_seo = generateSEOTitle(product_name);
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', error: 1 });
        }
        product.product_name = product_name;
        product.product_seo = product_seo;
        product.product_thumbnail = product_thumbnail;
        product.product_price = product_price;
        product.product_short_info = product_short_info;
        await product.save();
        res.status(200).json({ error: 0, data: product, message: ' Successfully Updated' });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
}

const deleteProduct  =  async  (req, res)=> {
    try {
        const { id } = req.body;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', error: 1 });
        }
        await product.destroy();
        res.status(200).json({ error: 0, data: null, message: 'Deleted Successfully' });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            uid : req.user.id ,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1,data: null ,  message: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
