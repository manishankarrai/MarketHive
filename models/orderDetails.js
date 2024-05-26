const { DataTypes } =  require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { Product } = require('./product');
const { User } = require('./user');


const Cart =  sequelize.define('carts' , {
      product_id: {
         type: DataTypes.INTEGER , 
         allowNull : false , 
         references: {
            model : Product ,
            key: 'id'
         }
      } , 
      uid : {
        type : DataTypes.INTEGER , 
        allowNull: true , 
        references : {
             model : User , 
             key: 'id'
        }
      }, 
      quantity : {
         type : DataTypes.INTEGER , 
         allowNull: false ,
         defaultValue : 1 
      }

}, {
    paranoid : true , 
    timestamps: true 
});


Product.belongsTo(User, { foreignKey: 'uid' });
Product.hasOne(Product, { foreignKey: 'product_id' });

sequelize.sync();


module.exports =  { Cart }