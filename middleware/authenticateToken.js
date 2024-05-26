const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/user');
const secret = process.env.SECRET;

const authenticateToken = async (req, res, next) => {
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

module.exports = { authenticateToken };
