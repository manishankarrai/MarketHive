const express = require('express');
const router = express.Router();
const { createSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory }
 = require('../../controller/subcategoryController');
const { authenticateToken }  = require('../../middleware/authenticateToken');


router.use(authenticateToken);
router.get('/test' , (req , res)=> { res.status(200).send({ message : "working"})});


router.post('/store', createSubCategory);
router.get('/get', getAllSubCategories);
router.post('/getbyid/', getSubCategoryById);
router.post('/update', updateSubCategory);
router.post('/delete', deleteSubCategory);

module.exports = router;
