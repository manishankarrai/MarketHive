const express = require('express');
const router = express.Router();
const { createSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategory, deleteSubCategory }
 = require('../../controller/subcategoryController');
 const { authenticateAdminToken } = require("../../middleware/authenticateToken");


router.get('/test' , (req , res)=> { res.status(200).send({ message : "working"})});


router.post('/store', authenticateAdminToken , createSubCategory);
router.get('/get', getAllSubCategories);
router.post('/getbyid/', getSubCategoryById);
router.post('/update', authenticateAdminToken , updateSubCategory);
router.post('/delete', authenticateAdminToken ,deleteSubCategory);

module.exports = router;
