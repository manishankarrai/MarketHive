const { Category } = require('../models/category');
const { logger }  =  require('../services/loggerService');
const {  generateSEOTitle }  = require('../services/commanFunction');

const createCategory =  async  (req, res)=> {
    try {
        const { category_name, category_priority } = req.body;
        const category_seo   =  generateSEOTitle(category_name);

        const category = await Category.create({ category_name, category_seo, category_priority });
        logger.info({
            message: 'category created' ,
            ip: req.ip,
            method: req.method,
            url: req.url , 
            data : category 
         });
        res.status(201).json({ error: 0, data: category, message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message ,
            ip: req.ip,
            method: req.method,
            url: req.url
         });
        res.status(500).json({ error: 1, message: error.message , data : null });
    }
}

const getAllCategories  = async  (req, res)=> {
    try {
        const categories = await Category.findAll({
            attributes: { exclude: ['deletedAt'] }
          });
        res.status(200).json({ error: 0, data: categories, message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message ,
            ip: req.ip,
            method: req.method,
            url: req.url
         });
        res.status(500).json({ error: 1, message: error.message});
    }
}

const getCategoryById  =  async  (req, res)=> {
    try {
        const { id } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 1, message: 'Category not found' });
        }
        res.status(200).json({ error: 0, data: category, message: 'Success' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message ,
            ip: req.ip,
            method: req.method,
            url: req.url
         });
        res.status(500).json({ error: 1, message: error.message });
    }
}

const updateCategory = async  (req, res) =>{
    try {
        const { id , category_name, category_priority } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 1, message: 'Category not found' });
        }
        const category_seo   =  generateSEOTitle(category_name);

        await category.update({ category_name, category_seo, category_priority });
        logger.info({
            message: 'category updated' ,
            ip: req.ip,
            method: req.method,
            url: req.url , 
            data : id 
         });
        res.status(200).json({ error: 0, data: category, message: 'Success Updated' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message ,
            ip: req.ip,
            method: req.method,
            url: req.url
         });
        res.status(500).json({ error: 1, message: error.message });
    }
}

const deleteCategory  =  async  (req, res)=> {
    try {
        const { id } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: 1, message: 'Category not found' });
        }
         let category_id =  category.id ;
         let seo =  category.category_seo + Math.floor(Math.random()*1000000000) ;
        await category.update({ category_seo : seo })
        await category.destroy();
        logger.info({
            message: 'category deleted' ,
            ip: req.ip,
            method: req.method,
            url: req.url , 
            data : category_id 
         });

        res.status(200).json({ error: 0, data: null, message: 'Success deleted' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message ,
            ip: req.ip,
            method: req.method,
            url: req.url
         });
        res.status(500).json({ error: 1, message: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
