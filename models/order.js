const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { User } =  require('./user');
const { BillingAddress } = require('./billingAddress');


const Order = sequelize.define('orders', {

    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    billing_address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },

    order_str_id: {
        type: DataTypes.STRING,
        allowNull: false
    },

    payment_status: {
        type: DataTypes.ENUM,
        values: ['pending', 'completed', 'failed', 'refunded' , 'processing'],
        allowNull: false,
        defaultValue: 'pending'
    },
    payable_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }


}, {
    paranoid: true,
    timestamps: true,
});


Order.hasOne(BillingAddress , { foreignKeys: 'billing_address_id'})
Order.hasOne(User, { foreignKey: 'uid' });

sequelize.sync();


module.exports =  { Order };