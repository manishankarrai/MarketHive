const express  = require('express');
const router  =  express.Router();
const adminAuth  =  require('./admin/authRoute');
const categoryRoute =  require('./admin/categoryRoute');
const subcategoryRoute =  require('./admin/subcategoryRoute');
const sellerAuth   = require('./seller/authRoute');
const productRoute =  require('./seller/productRoute');
const warehouseRoute =  require('./seller/warehouseRoute');
const stockRoute =  require('./seller/stockRoute');


router.use('/admin' , adminAuth );
router.use('/category' , categoryRoute );
router.use('/subcategory' , subcategoryRoute);

router.use('/seller'  , sellerAuth);
router.use('/product' , productRoute );
router.use('/warehouse' , warehouseRoute);
router.use('/stocks' , stockRoute);





module.exports =  router ;