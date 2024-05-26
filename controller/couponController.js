const { Coupon } = require('../models/coupon');
const { User } = require('../models/user');
const { sequelize } = require('../config/mysqlConnection');

const createCoupon = async (req, res) => {
    const { coupon_type, value, coupon_status } = req.body;
    try {
        const uid =  req.user.id ;
        const coupon = await Coupon.create({ coupon_type, uid, value, coupon_status });

        res.status(201).json({ error: 0, data: coupon, message: 'Coupon created successfully' });

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
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll( 
            { where : { uid: req.user.id } ,
            include: { model: User, as: 'user' }
        });
        res.status(200).json({ error: 0, data: coupons, message: 'Success' });
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
};

const getCouponById = async (req, res) => {
    const { id } = req.body;
    try {
        const coupon = await Coupon.findByPk(id, {
            include: { model: User, as: 'user' }
        });
        if (coupon) {
            res.status(200).json({ error: 0, data: coupon, message: 'Success' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Coupon not found' });
        }
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
};

const updateCoupon = async (req, res) => {
    const { id , coupon_type, value, coupon_status } = req.body;
    try {
        const uid = req.user.id ;
        const coupon = await Coupon.findByPk(id);
        if (coupon) {
            coupon.coupon_type = coupon_type;
            coupon.uid = uid;
            coupon.value = value;
            coupon.coupon_status = coupon_status;
            await coupon.save();
            res.status(200).json({ error: 0, data: coupon, message: 'Coupon updated successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Coupon not found' });
        }
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
};

const deleteCoupon = async (req, res) => {
    const { id } = req.body;
    try {
        const coupon = await Coupon.findByPk(id);
        if (coupon && coupon.uid ==  req.user.id ) {
            await coupon.destroy();
            res.status(200).json({ error: 0, data: null, message: 'Coupon deleted successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Coupon not found' });
        }
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
};

module.exports = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
};
