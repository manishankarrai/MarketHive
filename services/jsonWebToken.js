const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateUserToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }); 
};
const generateSellerToken = (seller) => {
  const payload = {
    id: seller.id,
    sellername: seller.sellername,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }); 
};
const generateAdminToken = (admin) => {
  const payload = {
    id: admin.id,
    adminname: admin.adminname,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }); 
};


module.exports = { generateUserToken , generateSellerToken , generateAdminToken };
