const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/mysqlConnection');


const Admin = sequelize.define('admin', {

  adminname: {
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

Admin.beforeCreate(async (admin) => {
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

Admin.beforeUpdate(async (admin) => {
  if (admin.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }
});

Admin.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};


sequelize.sync();

module.exports = { Admin };
