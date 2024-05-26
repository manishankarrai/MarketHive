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


module.exports = { generateUserToken , generateSellerToken };
