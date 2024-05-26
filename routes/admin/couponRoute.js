const express = require('express');
const {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
} = require('../../controller/couponController');

const router = express.Router();



router.post('/store', createCoupon);
router.get('/get', getAllCoupons);
router.post('/getbyid', getCouponById);
router.post('/update', updateCoupon);
router.post('/delete', deleteCoupon);


module.exports = router;
