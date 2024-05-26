const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { User } = require('./user');

const BillingAddress = sequelize.define('billing_addresses', {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    address_line1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address_line2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true,
    timestamps: true
});

User.hasMany(BillingAddress, { foreignKey: 'uid' });
BillingAddress.belongsTo(User, { foreignKey: 'uid' });

sequelize.sync();


module.exports = { BillingAddress };
