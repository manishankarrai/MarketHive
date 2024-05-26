const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');


const Category = sequelize.define('categories', {

    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    category_seo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category_priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    deletedAt: {
        type: DataTypes.DATE,
    }
}, {
    paranoid: true,
    timestamps: true,
});




sequelize.sync();

module.exports = { Category };
