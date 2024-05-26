const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { Product } = require('./product');
const { User } = require('./user');
const { Order } = require('./order');
const { Coupon } = require('./coupon');



const Coupon = sequelize.define('coupons', {
    order_id: {

        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },

    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    payment_status: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed', 'failed', 'refunded', 'processing'],
        allowNull: false,
        defaultValue: 'pending'
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    } ,
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false , 
        defaultValue :  0
    } ,
    coupon_id: {

        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Coupon,
            key: 'id'
        }
    } , 
    tnx_id: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    tnx_status: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    

}, {
    paranoid: true,
    timestamps: true
});


Product.belongsTo(User, { foreignKey: 'uid' });
Product.belongsTo(Order, { foreignKey: 'order_id' });
Product.belongsTo(Coupon, { foreignKey: 'coupon_id' });



sequelize.sync();


module.exports = { Coupon }