const { DataTypes } =  require('sequelize');
const { sequelize } = require('../config/mysqlConnection');
const { Product } = require('./product');
const { User } = require('./user');


const Coupon =  sequelize.define('coupons' , {
    coupon_type : {
        type: DataTypes.ENUM,
        values: ['Percentage', 'amount'],
        allowNull: false,
        defaultValue: 'Percentage'
    },
    sid : {
        type : DataTypes.INTEGER , 
        allowNull: true , 
        references : {
             model : User , 
             key: 'id'
        }
      }, 
    value : {
         type : DataTypes.DECIMAL(10 , 2) , 
         allowNull: false ,
         defaultValue : 1 
      } ,
    coupon_type : {
        type: DataTypes.ENUM,
        values: ['expired', 'enable' , 'disable'],
        allowNull: false,
        defaultValue: 'disable'
    },

}, {
    paranoid : true , 
    timestamps: true 
});


Product.belongsTo(User, { foreignKey: 'uid' });

sequelize.sync();


module.exports =  { Coupon }