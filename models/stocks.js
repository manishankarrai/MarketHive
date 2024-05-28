// models/Stock.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { Warehouse } = require('./warehouse');
const { Product } = require('./product');

const Stock = sequelize.define('stock', {
    product_id: {
        type: DataTypes.INTEGER , 
        allowNull : false , 
        references: {
           model : Product ,
           key: 'id'
        }
     } , 
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Warehouse,
            key: 'id'
        }
    }
}, {
    paranoid: true,
    timestamps: true
});

Warehouse.hasMany(Stock, { foreignKey: 'warehouse_id' });
Stock.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });
Stock.belongsTo(Product, { foreignKey: 'product_id' });


sequelize.sync();


module.exports = { Stock };
