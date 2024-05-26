const { Order } = require('../models/order');
const { OrderDetails } = require('../models/orderDetails');
const { sequelize } = require('../config/mysqlConnection');
const { logger } = require('../services/loggerService');


const createOrderWithDetails = async (req, res) => {
    const { uid, order_str_id, order_details } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const payable_amount = 0;

        const newOrder = await Order.create({
            uid,
            order_str_id,
            payable_amount
        }, { transaction });

        for (const detail of order_details) {
            payable_amount += detail.price * detail.quantity;
            await OrderDetails.create({
                order_id   : newOrder.id,
                product_id : detail.product_id,
                quantity   : detail.quantity,
                price      : detail.price
            }, { transaction });
        }
        newOrder.payable_amount = payable_amount;
        await newOrder.save();
         await Payment.create({
            order_id        : newOrder.id  ,
            payable_amount  : payable_amount ,
            uid             : req.user.id
        }, { transaction });

        await transaction.commit();

        const orderDetailsData = await OrderDetails.findAll({
            where: { order_id: newOrder.id }
        });

        const result = {
            order: newOrder,
            orderDetails: orderDetailsData
        };
        logger.info({
            message: 'Order generated',
            ip: req.ip,
            method: req.method,
            url: req.url,
            data: newOrder.id,
            uid: req.user.id
        });

        res.status(201).json({ error: 0, data: result, message: "success" });
    } catch (error) {
        await transaction.rollback();
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url,
            uid: req.user.id
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};


const applyCoupon  =  async  (req, res)=> {
    const transaction = await sequelize.transaction();

    try {
        const { order_id, coupon_id } = req.body;

        const coupon = await Coupon.findByPk(coupon_id, { transaction });
        if (!coupon) {
            throw new Error('Coupon not found');
        }

        const payment = await Payment.findOne({ where: { order_id }, transaction });
        if (!payment) {
            throw new Error('Payment not found');
        }

        const totalAmount = payment.total_amount;
        let discount_amount;
        if (coupon.type === 'percentage') {
            discount_amount = (totalAmount * coupon.value) / 100;
        } else {
            discount_amount = coupon.value;
        }

        payment.discount_amount = discount_amount;
        await payment.save({ transaction });

        const order = await Order.findByPk(order_id, { transaction });
        if (!order) {
            throw new Error('Order not found');
        }

        order.payable_amount = totalAmount - discount_amount;
        await order.save({ transaction });

        await transaction.commit();

        const result = {
            order: order,
            payment: payment
        };

        res.status(200).send({ error: 0, data: result, message: 'Success' });
        
    } catch (error) {
        await transaction.rollback();
        logger.error({
            message: error.message,
            ip: req.ip,
            method: req.method,
            url: req.url,
            uid: req.user ? req.user.id : null
        });
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
}


module.exports = {
    createOrderWithDetails ,
    applyCoupon
};
