const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/user');
const { Seller } = require('../models/seller');
const secret = process.env.SECRET;

const authenticateUserToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(403).send({message: 'credencial missing , please login again'  , error : 1 });
    }

    req.user = user;
    next();
  } catch (error) {

    return res.status(403).send({message: error.message  , error : 1 });

  }
};

const authenticateSellerToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, secret);
    const seller = await Seller.findByPk(decoded.id);

    if (!seller) {
      return res.status(403).send({message: 'credencial missing , please login again'  , error : 1 });
    }

    req.seller = seller;
    next();
  } catch (error) {

    return res.status(403).send({message: error.message  , error : 1 });

  }
};
const authenticateAdminToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, secret);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(403).send({message: 'credencial missing , please login again'  , error : 1 });
    }

    req.admin = admin;
    next();
  } catch (error) {

    return res.status(403).send({message: error.message  , error : 1 });

  }
};

module.exports = { authenticateUserToken ,  authenticateSellerToken   , authenticateAdminToken };
