const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { Seller } = require('./seller');
const Warehouse = sequelize.define('warehouse', {
    sid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Seller,
            key: 'id'
        }
    },
    warehouse_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    warehouse_location: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true,
    timestamps: true
});

Warehouse.belongsTo(Seller, { foreignKey: 'sid' });

sequelize.sync();


module.exports = { Warehouse };
