const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');

const Warehouse = sequelize.define('warehouse', {
    sid : {
        type : DataTypes.INTEGER , 
        allowNull: true , 
        references : {
             model : User , 
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

Order.hasOne(User, { foreignKey: 'uid' });

sequelize.sync();


module.exports = { Warehouse };
