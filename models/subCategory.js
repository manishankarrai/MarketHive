const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { Category }  =  require('./category');
 

const SubCategory = sequelize.define('subcategories', {


    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    subcategory_seo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    subcategory_priority: {
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

SubCategory.belongsTo(Category, { foreignKey: 'category_id' });


sequelize.sync();

module.exports = { SubCategory };
