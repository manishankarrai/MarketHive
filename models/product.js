const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { User } = require('./user');
const { Category } = require('./category');
const { SubCategory } = require('./subcategory');




const Product = sequelize.define('products', {

    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SubCategory,
            key: 'id'
        }
    },
    product_name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: false,
    },
    product_seo: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: false,
    },
    product_thumbnail: {
        type: DataTypes.STRING ,
        allowNull: true,
    },
    product_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_short_info: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        unique: false,
    },

    deletedAt: {
        type: DataTypes.DATE,
    }
}, {
    paranoid: true,
    timestamps: true,
});

Product.belongsTo(Category, { foreignKey: 'category_id' });
Product.belongsTo(SubCategory, { foreignKey: 'subcategory_id' });
Product.belongsTo(User, { foreignKey: 'uid' });


sequelize.sync();

module.exports = { Product };
