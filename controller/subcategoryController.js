const { SubCategory } = require('../models/subcategory');
const { Category } = require('../models/category');
const { generateSEOTitle } = require('../services/commanFunction');
const { logger  } =  require('../services/loggerService');

async function createSubCategory(req, res) {
    try {
        const { category_id, subcategory_name, subcategory_priority } = req.body;
        const subcategory_seo = generateSEOTitle(subcategory_name);
        const subCategory = await SubCategory.create({
            category_id,
            subcategory_name,
            subcategory_seo,
            subcategory_priority,
        });
        logger.info({
            message: 'subcategory created' ,
            ip: req.ip,
            method: req.method,
            url: req.url , 
            data : subCategory 
         });
        res.status(201).json({ error: 0, data: subCategory, message: 'Created Successfully' });
    } catch (error) {
        console.error(error);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, message: error.message });
    }
}

async function getAllSubCategories(req, res) {
    try {
        const subCategories = await SubCategory.findAll({
            attributes: { exclude: ['deletedAt'] },
            include: [{ model: Category, attributes: ['id', 'category_name'] }],
        });
        res.status(200).json({ error: 0, data: subCategories, message: 'Success' });
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
}

async function getSubCategoryById(req, res) {
    try {
        const { id } = req.body;
        const subCategory = await SubCategory.findByPk(id, {
            attributes: { exclude: ['deletedAt'] },
            include: [{ model: Category, attributes: ['id', 'category_name'] }],
        });
        if (!subCategory) {
            return res.status(404).json({ error: 0, data: subCategory, message: 'Success' });
        }
        res.status(200).json(subCategory);
    } catch (error) {
        res.status(400).json({ message: error.message, error: 1 });
    }
}

async function updateSubCategory(req, res) {
    try {
        const { id , subcategory_name, subcategory_priority , category_id } = req.body;
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found', error: 1 });
        }
        const subcategory_seo = generateSEOTitle(subcategory_name);

        subCategory.subcategory_name = subcategory_name;
        subCategory.subcategory_seo = subcategory_seo;
        subCategory.category_id      =  category_id ;
        subCategory.subcategory_priority = subcategory_priority;
        await subCategory.save();
        logger.info({
            message: 'category updated' ,
            ip: req.ip,
            method: req.method,
            url: req.url , 
            data : id 
         });
        res.status(200).json({ error: 0, data: subCategory, message: 'Updated Successfully' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, message: error.message });
    }
}
async function deleteSubCategory(req, res) {
    try {
        const { id } = req.body;
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) {
            return res.status(404).json({ message: 'SubCategory not found', error: 1 });
        }

        let seo = subCategory.subcategory_seo + Math.floor(Math.random() * 1000000000);
        let subcategory_id = subCategory.id;
        subCategory.update({ subcategory_seo: seo });

        await subCategory.destroy();
        logger.info({
            message: 'category deleted',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: subcategory_id
        });
        res.status(200).json({ error: 0, data: null, message: 'Deleted Successfully' });
    } catch (error) {
        console.error(error.message);
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url
        });
        res.status(500).json({ error: 1, message: error.message });
    }
}

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
};
