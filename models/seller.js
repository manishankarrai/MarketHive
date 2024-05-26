const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/mysqlConnection');


const Seller = sequelize.define('sellers', {

  sellername: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  deletedAt: {
    type: DataTypes.DATE,
  }
}, {
  paranoid: true, 
  timestamps: true,
});

Seller.beforeCreate(async (seller) => {
  const salt = await bcrypt.genSalt(10);
  seller.password = await bcrypt.hash(seller.password, salt);
});

Seller.beforeUpdate(async (seller) => {
  if (seller.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    seller.password = await bcrypt.hash(seller.password, salt);
  }
});

Seller.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};


sequelize.sync();

module.exports = { Seller };
